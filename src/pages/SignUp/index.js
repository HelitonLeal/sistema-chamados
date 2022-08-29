import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import logo from '../../assets/logo.png';

function SignUp() {

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(event){
    event.preventDefault();

    if(name !== '' && email !== '' && password !== ''){
      signUp(email, password, name)
    }
  }

  return (
      <div className='container-center'>
        <div className='login'>
          <div className='login-area'>
            <img src={logo} alt='Logo do Sistema' />
          </div>

          <form onSubmit={handleSubmit} >
            <h1>Cadastrar conta</h1>
            <input type="text" placeholder='Seu nome' value={name} onChange={(event) => setName(event.target.value) } />
            <input type="text" placeholder='email@dominio.com' value={email} onChange={(event) => setEmail(event.target.value) } />
            <input type="password" placeholder='********' value={password} onChange={(event) => setPassword(event.target.value) } />
            <button type='submit'>{loadingAuth ? 'Cadastrando...': 'Cadastrar'}</button>
          </form>
          <Link to="/">Já tenho uma conta</Link>
        </div>
      </div>
    );
   }
   
   export default SignUp;