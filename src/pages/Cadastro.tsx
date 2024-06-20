import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function Cadastrar(){

    let nome: string = '';
    let senha: string = '';
    let email: string = '';
    let tel: string = '';
    let nav = useNavigate();


    function pegarNome(e: any) {
        nome = e.target.value;
    }
    function pegarSenha(e: any) {
        senha = e.target.value;
    }
    function pegarEmail(e: any) {
        email = e.target.value;
    }
    function pegarTel(e: any) {
        tel = e.target.value;
    }

    async function cadastrarUsuário(){
        if(nome === '' || senha === '' || email == '' || tel == ''){
            alert('Preencha todos os campos');
        }else{
            try {
                const cadastrar = await axios.post('https://trabalhobackend.onrender.com/cliente', {
                  cli_password: senha.toLowerCase(),
                  cli_nome: nome.toLocaleLowerCase(),
                  cli_email: email,
                  cli_tel: tel
                });
                console.log(cadastrar);
                
                localStorage.setItem('cli_nome', nome);
                console.log('Usuário cadastrado com sucesso!');
                nav('/Home');
              } catch (error) {
                console.error('Erro:', error);
              }
        }
    }

    return(
        <>
        
        <div className='bg-gray-300 mx-auto conteiner-cadastro  w-96'>
          <Header text='Cadastrar' />

          <label className='ml-12 text-black' htmlFor="Username">Nome</label>
          <input onChange={pegarNome} type="text" className='nome ml-1 mt-16 mb-8 border-none outline-0'  name='Username' placeholder='Nome:'/>
          <br />
          <label className='ml-12 text-black' htmlFor="password">Senha</label>
          <input onChange={pegarSenha} className='senha border-none outline-0' type="password" name='password' placeholder='Senha:'/>
          <br />
          <label className="ml-12 text-black" htmlFor="email">Email</label>
          <input onChange={pegarEmail} className="nome ml-1.5 mt-8 mb-8 border-none outline-0" type="email" name="email" placeholder="Email:"/>
          <br />
          <label className="ml-12 text-black mr-4" htmlFor="tel">Tel</label>
          <input onChange={pegarTel} type="tel" className="nome ml-1.5 border-none outline-0" name="tel" placeholder='(99)99999-9999' pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})"/>

          <button className='mt-8 ml-24' onClick={cadastrarUsuário} >Enviar</button>
      </div>
        
        </>
    )
}
