import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";

type Product = {
  pro_cod:any;
  pro_nome:any;
  pro_descri:any;
  pro_preco:any;
  pro_qtda:any;
  pro_fabricante:any;
}

export function Home() {
  const [products, setProducts] = useState([]);
  const [qtdaVendas, setQtdaVendas] = useState<string>('');
  let nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pass = localStorage.getItem('senha');
        const response = await axios.get("https://trabalhobackend.onrender.com/produto");
        const resp = await axios.get(`https://trabalhobackend.onrender.com/cliente/${pass}`);
    
        if (resp.data[0] && resp.data[0].cli_qtdavendas !== undefined) {
          setQtdaVendas(resp.data[0].cli_qtdavendas);
        } else {
          console.log("Dados de quantidade de vendas não encontrados ou inválidos:", resp.data);
        }

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    revirify();
  }, []);

  async function revirify(){
    const storedName = localStorage.getItem('nome');
    const storedPass = localStorage.getItem('senha');
    if (storedName && storedPass) {
      return
    }else{
      nav('/');
    }
  }

  function redirectToBuy(){
    nav('/comprar');
  }
  function redirectToProduct(){
    nav('/cadPro');
  }

  return (
    <>
      <header className="flex-row absolute top-0 flex-wrap h-32 bg-slate-700">
        <h1 className="text-white mt-8 text-2xl px-4 py-2">Produtos</h1>
        <h2>{qtdaVendas}  produtos comprados</h2>

        <IoPersonCircleSharp onClick={() => nav('/meuperfil')}  className="size-20 absolute top-6 left-4 cursor-pointer"/>

        <p onClick={redirectToBuy} className="absolute top-10 bg-slate-300 hover:bg-slate-950 hover:text-white transition-all  rounded text-black w-24  right-16">Fazer Compra</p>
        <p onClick={redirectToProduct} className="absolute top-10 bg-slate-300 hover:bg-slate-950 hover:text-white transition-all  rounded text-black w-24  left-3/4">Cadastrar Produto</p>
      </header>

      <div className="container mx-auto mt-10">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Fabricante</th>
            </tr>
          </thead>
          <tbody>
            {products.map( (product:Product) => (
              <tr key={product.pro_cod}>
                <td className="border px-4 py-2">{product.pro_cod}</td>
                <td className="border px-4 py-2">{product.pro_nome}</td>
                <td className="border px-4 py-2">{product.pro_descri}</td>
                <td className="border px-4 py-2">R$ {parseFloat(product.pro_preco).toFixed(2)}</td>
                <td className="border px-4 py-2">{product.pro_qtda}</td>
                <td className="border px-4 py-2">{product.pro_fabricante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
