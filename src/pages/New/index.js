import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlus } from 'react-icons/fi';
import './new.css';

export default function New(){

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);
// --------------------------------------------------------------------------------------------->

    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia,
                    })
                })
                if(lista.length === 0){
                    console.log('Nenhuma Empresa Encontrada!!');
                    setCustomers([ {id: '1', nomeFantasia: ''} ]);
                    setLoadCustomers(false);
                    return;
                }
                setCustomers(lista);
                setLoadCustomers(false);
            })
            .catch((error) => {
                console.log('Ocorreu um erro!!', error);
                setLoadCustomers(false);
                setCustomers([ {id: '1', nomeFantasia: ''} ]);
            })
        }
        loadCustomers();
    }, [])
// --------------------------------------------------------------------------------------------->

    function handleRegister(event){
        event.preventDefault();
        alert('Clicou');
    }
// --------------------------------------------------------------------------------------------->

    function handleChangeSelect(event){
        setAssunto(event.target.value);
    }
// --------------------------------------------------------------------------------------------->

    function handleOptionChange(event){
        setStatus(event.target.value);
    }
// --------------------------------------------------------------------------------------------->

    function handleChangeCustomers(event){
        setCustomerSelected(event.target.value);
    }
// --------------------------------------------------------------------------------------------->

    return(
        <div>
            <Header />
            <div className='content'>
                <Title name='Novo Chamado'>
                        <FiPlus size={25} color='#000'/>
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type='text' disabled={true} value='Carregando Clientes ...' />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    );
                                })}
                            </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Técnica'>Visita Técnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>
                        <label>Status</label>
                        <div className='status'>
                            <input type='radio' name='radio' value='Aberto' onChange={handleOptionChange}
                                checked={status === 'Aberto'} />
                            <span>Em Aberto</span>
                            
                            <input type='radio' name='radio' value='Pendente' onChange={handleOptionChange}
                                checked={status === 'Pendente'} />
                            <span>Pendente</span>
                            
                            <input type='radio' name='radio' value='Fechado' onChange={handleOptionChange} 
                                checked={status === 'Fechado'} />
                            <span>Fechado</span>
                        </div>
                        <label>Complemento</label>
                        <textarea type='text' placeholder='Descreva sua solicitação (Opcional)' value={complemento}
                        onChange={ (event) => setComplemento(event.target.value) } />
                        <button type='submit'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}