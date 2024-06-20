import axios from "axios";

export async function Logar(nome:string, senha:string, navigate: Function) {
    try {
      const login = await axios.post('http://localhost:3344/login', {
        cli_password: senha.toLowerCase(),
        cli_nome: nome.toLowerCase()
      });
      localStorage.setItem('cli_nome', nome);
      console.log('Logado com sucesso!');
      navigate('/Home');
    } catch (error) {
      console.error('Erro:', error);
    }
}