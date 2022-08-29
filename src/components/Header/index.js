import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth'; 
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Header(){

    const { user } = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='Foto Avatar' />
            </div>
            <Link to='/dashboard' >
                <FiHome size={24} color='#fff'/>
                Chamados
            </Link>
            <Link to='/customers' >
                <FiUser size={24} color='#fff'/>
                Clientes
            </Link>
            <Link to='/profile' >
                <FiSettings size={24} color='#fff'/>
                Configurações
            </Link>
        </div>
    );
}