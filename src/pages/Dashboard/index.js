import './dashboard.css';
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import firebase from '../../services/firebaseConnection';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard(){

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    useEffect(() => {

        loadChamados();

        return () => {

        }
    }, []);
// --------------------------------------------------------------------------------------------->

    async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
        .catch((error) => {
            console.log(error);
            setLoadingMore(false);
        })
        setLoading(false);
    }
// --------------------------------------------------------------------------------------------->

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })
            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }
// --------------------------------------------------------------------------------------------->

    async function handleMore(){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
    }
// --------------------------------------------------------------------------------------------->

if(loading){
    return(
        <div>
                <Header/>
                <div className='content'>
                    <Title name='Chamados'>
                        <FiMessageSquare size={25}/>
                    </Title>
                    <div className='container dashboard'>
                        <span>Buscando Chamados...</span>
                    </div>
                </div>
            </div>
        );
    }
// --------------------------------------------------------------------------------------------->
    
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Chamados'>
                    <FiMessageSquare size={25}/>
                </Title>
                
                {chamados.length === 0 ? (

                    <div className='container dashboard'>
                        <span>Nenhum chamado registrado...</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color='#fff' />
                            Novo Chamado
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color='#fff' />
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Criado em</th>
                                    <th scope='col'>#</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                {chamados.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label='Cliente'>{item.cliente}</td>
                                            <td data-label='Assunto'>{item.assunto}</td>
                                            <td data-label='Status'>
                                                <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#aaa'}}>{item.status}</span>
                                            </td>
                                            <td data-label='Criado em'>{item.createdFormated}</td>
                                            <td data-label='#'>
                                                <button className='action' style={{ backgroundColor: '#3583f6' }}>
                                                    <FiSearch color='#fff' size={18} />
                                                </button>
                                                <button className='action' style={{backgroundColor: '#f6a935'}}>
                                                    <FiEdit2 color='#fff' size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: "center", marginTop: 15}}>Buscando Chamados...</h3>}
                        {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
                    </>
                )}

            </div>
        </div>
    );
}