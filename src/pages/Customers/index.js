import { useState } from 'react';

import './customers.css';

import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Customers(){

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

// --------------------------------------------------------------------------------------------->

    async function handleAdd(event){
        event.preventDefault();

        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.info('Empresa Cadastrada com Sucesso!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao Cadastrar Empresa!');
            })
        }else{
            toast.error('Preencha todos os campos.');
        }
    }
// --------------------------------------------------------------------------------------------->

    return(
        <div>
            <Header />
            <div className='content'>
                <Title name='Clientes'>
                    <FiUser size={25} color='#000'/>
                </Title>
                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type='text' placeholder='Nome da Empresa' value={nomeFantasia} onChange={(event) => setNomeFantasia(event.target.value)}/>
                        
                        <label>CNPJ</label>
                        <input type='text' placeholder='CNPJ da Empresa' value={cnpj} onChange={(event) => setCnpj(event.target.value)}/>
                        
                        <label>Endereço</label>
                        <input type='text' placeholder='Endereço da Empresa' value={endereco} onChange={(event) => setEndereco(event.target.value)}/>

                        <button type='submit'>Cadastrar</button>
                    </form>                    
                </div>                
            </div>
        </div>
    );
}