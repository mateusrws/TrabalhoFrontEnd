import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { Logar } from './components/Logar';
import { Header } from './components/Header';

export function Login() {
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const navigate = useNavigate();

  const pegarNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    
  }

  const pegarSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await initLogar();
  }

  async function initLogar(){
    localStorage.setItem('nome', nome);
    localStorage.setItem('senha', senha);
    await Logar(nome, senha, navigate);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-gray-300 mx-auto h-96 w-96'>
          <Header text='Logar'/>

          <label className='ml-12 text-black' htmlFor="Username">Name</label>
          <input onChange={pegarNome} type="text" className='nome ml-1 mt-16 mb-8 border-none outline-0'  name='Username' placeholder='Username:'/>
          <br />
          <label className='ml-12 text-black' htmlFor="password">Senha</label>
          <input onChange={pegarSenha} className='senha border-none outline-0' type="password" name='password' placeholder='Senha:'/>
          <br />

          <button type="submit" className='mt-8 ml-24'>Enviar</button>

          <p className='ml-24 text-red-700 text-xs text-left ml-14 mt-4'>Não sou cadastrado</p>

      </div>
    </form>
  )
}
