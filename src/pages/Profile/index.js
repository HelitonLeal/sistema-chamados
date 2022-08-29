import './profile.css';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiSettings } from 'react-icons/fi';

export default function Profile(){
    return(
        <div>
            <Header />
            <div className='content'>
                <Title name="Meu Perfil">
                    <FiSettings size={25} color="#000" />
                    
                </Title> 

            </div>
        </div>
    );
}