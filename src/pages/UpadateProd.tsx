import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function UpdateProd() {
    const [produtoNome, setProdutoNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [fabricante, setFabricante] = useState<string>('');
    const [quantidade, setQuantidade] = useState<number>(0);
    const [preco, setPreco] = useState<number>(0);
    const { cod } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduto() {
            try {
                const response = await axios.get(`https://trabalhobackend.onrender.com/produto/${cod}`);
                const produto = response.data;
                setProdutoNome(produto.pro_nome || '');
                setDescricao(produto.pro_descri || '');
                setFabricante(produto.pro_fabricante || '');
                setQuantidade(produto.pro_qtda || 0);
                setPreco(produto.pro_preco || 0);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        }
        fetchProduto();
    }, [cod]);

    const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement>) => setProdutoNome(e.target.value);    
    const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value);    
    const handleFabricanteChange = (e: React.ChangeEvent<HTMLInputElement>) => setFabricante(e.target.value);    
    const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantidade(Number(e.target.value));    
    const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => setPreco(Number(e.target.value));    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await atualizarProduto();
    }

    async function atualizarProduto() {
        try {
            await axios.put(`https://trabalhobackend.onrender.com/produto/${cod}`, {
                pro_nome: produtoNome || 'empty',
                pro_descri: descricao || 'empty',
                pro_fabricante: fabricante || 'empty',
                pro_qtda: quantidade || 0,
                pro_preco: preco || 0
            });
            console.log('Produto alterado com sucesso!');
            navigate('/Home');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    }

    return (
        <>
            <Header text="Produto" func={() => navigate('/Home')} />
            <form onSubmit={handleSubmit}>
                <div className="container bg-gray-300 mx-auto h-100 w-96 p-4">
                    <label className="block text-black" htmlFor="produto">Produto</label>
                    <input 
                        onChange={handleProdutoChange} 
                        value={produtoNome} 
                        type="text" 
                        className="w-full p-2 mt-2 mb-4 border border-gray-400 rounded" 
                        name="produto" 
                        placeholder="Nome do produto:" 
                    />

                    <label className="block text-black" htmlFor="descri">Descrição</label>
                    <input 
                        onChange={handleDescricaoChange} 
                        value={descricao} 
                        className="w-full p-2 mb-4 border border-gray-400 rounded" 
                        type="text" 
                        name="descri" 
                        placeholder="Descrição:" 
                    />

                    <label className="block text-black" htmlFor="fabricante">Fabricante</label>
                    <input 
                        onChange={handleFabricanteChange} 
                        value={fabricante} 
                        className="w-full p-2 mb-4 border border-gray-400 rounded" 
                        type="text" 
                        name="fabricante" 
                        placeholder="Nome do fabricante:" 
                    />

                    <label className="block text-black" htmlFor="qtda">Quantidade</label>
                    <input 
                        onChange={handleQuantidadeChange} 
                        value={quantidade} 
                        className="w-full p-2 mb-4 border border-gray-400 rounded" 
                        type="number" 
                        name="qtda" 
                        placeholder="Quantidade:" 
                    />

                    <label className="block text-black" htmlFor="preco">Preço</label>
                    <input 
                        onChange={handlePrecoChange} 
                        value={preco} 
                        className="w-full p-2 mb-4 border border-gray-400 rounded" 
                        type="number" 
                        name="preco" 
                        placeholder="Preço:" 
                    />

                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Enviar</button>
                </div>
            </form>
        </>
    )
}
