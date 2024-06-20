import axios from "axios";

export async function Logar(nome:string, senha:string, navigate: Function) {
    try {
      const login = await axios.post('https://trabalhobackend.onrender.com/login', {
        cli_password: senha.toLowerCase(),
        cli_nome: nome.toLowerCase()
      });
      console.log(login)
      localStorage.setItem('cli_nome', nome);
      console.log('Logado com sucesso!');
      navigate('/Home');
    } catch (error) {
      console.error('Erro:', error);
    }
}
