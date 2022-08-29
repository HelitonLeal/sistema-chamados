import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import './signin.css';
import logo from '../../assets/logo.png';

function SignIn() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(event){
    event.preventDefault();

    if(email !== '' && password !== ''){
      signIn(email, password)
    }
  }

  return (
      <div className='container-center'>
        <div className='login'>
          <div className='login-area'>
            <img src={logo} alt='Logo do Sistema' />
          </div>

          <form onSubmit={handleSubmit} >
            <h1>Entrar</h1>
            <input type="text" placeholder='email@dominio.com' value={email} onChange={(event) => setEmail(event.target.value) } />
            <input type="password" placeholder='********' value={password} onChange={(event) => setPassword(event.target.value) } />
            <button type='submit'>{loadingAuth ? 'Carregando...': 'Acessar'}</button>
          </form>
          <Link to="/register">Criar conta</Link>
        </div>
      </div>
    );
   }
   
   export default SignIn;