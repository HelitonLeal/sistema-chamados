import './dashboard.css';
import { useState } from "react";

import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';

import { Link } from 'react-router-dom';

export default function Dashboard(){

    const [chamados, setChamados] = useState([1]);

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
                                <tr>
                                    <td data-label='Cliente'>HTF</td>
                                    <td data-label='Assunto'>Trocar câmeras da entrada</td>
                                    <td data-label='Status'>
                                        <span className='badge' style={{ backgroundColor: '#5cb85c'}}>Em Aberto</span>
                                    </td>
                                    <td data-label='Criado em'>30/08/2022</td>
                                    <td data-label='#'>
                                        <button className='action' style={{ backgroundColor: '#3583f6' }}>
                                            <FiSearch color='#fff' size={18} />
                                        </button>
                                        <button className='action' style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color='#fff' size={18} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}

            </div>
        </div>
    );
}