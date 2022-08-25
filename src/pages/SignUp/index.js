import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function SignUp() {

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  function handleSubmit(event){
    event.preventDefault();
    alert("Clicou!!" + email + " " + password);
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
            <button type='submit'>Cadastrar</button>
          </form>
          <Link to="/">Já tenho uma conta</Link>
        </div>
      </div>
    );
   }
   
   export default SignUp;