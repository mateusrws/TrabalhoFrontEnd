import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header';


export function CadPro(){
    const [nome_produto, setProduto] = useState<string>('');
    const [descri, setDescri] = useState<string>('');
    const [fabricante, setFabricante] = useState<string>('');
    const [qtda, setQtda] = useState<number>(0);
    const [preco, setPreco] = useState<number>(0);
    const nav = useNavigate();

    const pegarProduto = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduto(e.target.value);    
    };
    const pegarDescri = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescri(e.target.value);    
    };
    const pegarFabricante = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFabricante(e.target.value);    
    };
    const pegarQtda = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQtda(Number(e.target.value));    
    };
    const pegarPreco = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreco(Number(e.target.value));    
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registrar();
    }

    async function registrar(){
        if(nome_produto === '' || descri === '' || fabricante === '' || qtda === 0 || preco === 0){
            alert('Preencha todos os campos');
        }else{
            try {
                await axios.post('https://trabalhobackend.onrender.com/produto', {
                    pro_nome: nome_produto,
                    pro_descri: descri,
                    pro_fabricante: fabricante,
                    pro_qtda: qtda,
                    pro_preco: preco
                });
                console.log('Produto cadastrado com sucesso!');
                nav('/Home');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <>
            <Header text="Produto" func={() => nav('/Home')}/>
            <form onSubmit={handleSubmit}>
                <div className="container bg-gray-300 mx-auto h-96 w-96">
                    
                    <label className='ml-12 text-black' htmlFor="produto">Produto</label>
                    <input onChange={pegarProduto} type="text" className='nome ml-1 mt-16 mb-4 border-none outline-0' name='produto' placeholder='Nome do produto:'/>
                    
                    <label className='ml-9 text-black' htmlFor="descri">Descrição</label>
                    <input onChange={pegarDescri} className='senha border-none mb-4 outline-0' type="text" name='descri' placeholder='Descrição:'/>
                    
                    <br />
                    <label className='ml-8 text-black' htmlFor="fabricante">Fabricante</label>
                    <input onChange={pegarFabricante} className='senha mb-4 border-none outline-0' type="text" name='fabricante' placeholder='Nome do fabricante:'/>
                    
                    <br />
                    <label className='ml-6 text-black' htmlFor="qtda">Quantidade</label>
                    <input onChange={pegarQtda} className='senha border-none mb-4 outline-0' type="number" name='qtda' placeholder='Quantidade:'/>
                    
                    <br />
                    <label className='ml-16 mr-1 text-black' htmlFor="preco">Preço</label>
                    <input onChange={pegarPreco} className='senha border-none outline-0' type="number" name='preco' placeholder='Preço:'/>
                    
                    <br />
                    <button type="submit" className='mt-6 ml-24'>Enviar</button>
                </div>      
            </form>
        </>
    )
}
