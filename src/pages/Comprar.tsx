import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function Comprar() {
    const [ven_valor, setVen_valor] = useState<number>(0);
    const [pro_cod, setPro_cod] = useState<number>(0);
    const [cli_cod, setCli_cod] = useState<number>(0);
    const [ven_qtda, setVen_qtda] = useState<number>(0);
    const nav = useNavigate();

    const pegarPro_cod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPro_cod(Number(e.target.value));
    };

    const pegarCli_cod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCli_cod(Number(e.target.value));
    };

    const pegarQtda = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVen_qtda(Number(e.target.value));
    };

    const pegarPreco = async () => {
        try {
            console.log(`Fetching price for product code: ${pro_cod}`);
            const result = await axios.get(`https://trabalhofrontend.onrender.com/produto/${pro_cod}`);
            if (result.data) {
                let preco = Number(result.data.pro_preco);
                setVen_valor(ven_qtda * preco);
            }
        } catch (error) {
            console.error('Erro ao obter o preço do produto:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://trabalhofrontend.onrender.com/vendas', {
                pro_cod,
                cli_cod,
                ven_qtda,
                ven_valor
            });
            alert('Compra realizada com sucesso!');
            nav('/Home');
        } catch (error) {
            console.error('Erro ao realizar a compra:', error);
        }
    };

    useEffect(() => {
        if (pro_cod && ven_qtda) {
            pegarPreco();
        }
    }, [pro_cod, ven_qtda]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container bg-gray-300 mx-auto h-96 w-96">
                    <Header text="Comprar" func={() => nav('/Home')}/>

                    <label className='ml-1 text-black' htmlFor="produto">ID do produto</label>
                    <input onChange={pegarPro_cod} type="number" className='nome ml-1 mt-16 mb-4 border-none outline-0' name='produto' placeholder='ID do produto:' />
                    <br />
                    <label className='mr-1 text-black' htmlFor="preco">ID do comprador</label>
                    <input onChange={pegarCli_cod} className='mb-4 border-none outline-0' type="number" name='preco' placeholder='ID:' />
                    <br />
                    <label className='ml-6 text-black' htmlFor="qtda">Quantidade</label>
                    <input onChange={pegarQtda} className='senha border-none mb-4 outline-0' type="number" name='qtda' placeholder='Quantidade:' />
                    <br />
                    <h2 className='text-left text-xl mt-5 mb-5 text-black'>Preço: R${ven_valor}</h2>
                    <button type="submit" className='mt-6 ml-24'>Enviar</button>
                </div>
            </form>
        </>
    );
}
