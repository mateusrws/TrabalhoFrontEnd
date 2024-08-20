import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

type Product = {
  pro_cod: string;
  pro_nome: string;
  pro_descri: string;
  pro_preco: string | number;
  pro_qtda: number;
  pro_fabricante: string;
};

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [qtdaVendas, setQtdaVendas] = useState<string>("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pass = localStorage.getItem("senha");
        const response = await axios.get("https://trabalhobackend.onrender.com/produto");
        const resp = await axios.get(`https://trabalhobackend.onrender.com/cliente/${pass}`);

        if (resp.data[0]?.cli_qtdavendas !== undefined) {
          setQtdaVendas(resp.data[0].cli_qtdavendas);
        } else {
          console.log("Dados de quantidade de vendas não encontrados ou inválidos:", resp.data);
        }

        const sanitizedProducts = response.data.map((product: Product) => ({
          ...product,
          pro_cod: String(product.pro_cod).trim(),
          pro_nome: String(product.pro_nome).trim(),
          pro_descri: String(product.pro_descri).trim(),
          pro_preco: Number(product.pro_preco),
          pro_qtda: Number(product.pro_qtda),
          pro_fabricante: String(product.pro_fabricante).trim(),
        }));

        setProducts(sanitizedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    revirify();
  }, []);

  async function revirify(): Promise<void> {
    const storedName = localStorage.getItem("nome");
    const storedPass = localStorage.getItem("senha");
    if (!storedName || !storedPass) {
      nav("/");
    }
  }

  function redirectToBuy() {
    nav("/comprar");
  }

  function redirectToProduct() {
    nav("/cadPro");
  }

  async function deletar(cod: string) {
    try {
        console.log('Tentando deletar produto com código:', cod);
        const response = await axios.delete(`https://trabalhobackend.onrender.com/produto/${cod}`);
        if (response.status === 200) {
            console.log('Produto deletado com sucesso:', response.data);
            window.location.reload();
        } else {
            console.error('Erro ao deletar produto: Resposta inesperada', response);
        }
    } catch (error: any) {
        console.error('Erro ao deletar produto:', error.message);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }
    }
  }

  return (<>
    <header className="flex-row absolute top-0 flex-wrap h-32 bg-slate-700">
      <h1 className="text-white mt-8 text-2xl px-4 py-2">Produtos</h1>
      <h2>{qtdaVendas} produtos comprados</h2>

      <IoPersonCircleSharp
        onClick={() => nav("/meuperfil")}
        className="size-20 absolute top-6 left-4 cursor-pointer"
      />

      <p
        onClick={redirectToBuy}
        className="absolute top-10 bg-slate-300 hover:bg-slate-950 hover:text-white transition-all rounded text-black w-24 right-16"
      >
        Fazer Compra
      </p>
      <p
        onClick={redirectToProduct}
        className="absolute top-10 bg-slate-300 hover:bg-slate-950 hover:text-white transition-all rounded text-black w-24 left-3/4"
      >
        Cadastrar Produto
      </p>
    </header>
    <div className="container mx-auto mt-10">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Descrição</th>
            <th className="px-4 py-2 border">Preço</th>
            <th className="px-4 py-2 border">Quantidade</th>
            <th className="px-4 py-2 border">Fabricante</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pro_cod} className="group">
              <td className="border px-4 py-2">{product.pro_cod}</td>
              <td className="border px-4 py-2">{product.pro_nome}</td>
              <td className="border px-4 py-2">{product.pro_descri}</td>
              <td className="border px-4 py-2">
                R$ {Number(product.pro_preco).toFixed(2)}
              </td>
              <td className="border px-4 py-2">{product.pro_qtda}</td>
              <td className="border px-4 py-2">{product.pro_fabricante}</td>
              <td className="border px-4 py-2 relative">
                <span
                  id="icones"
                  className="hidden group-hover:flex items-center justify-center"
                >
                  <FaPen onClick={() => nav(`/update/${product.pro_cod}`)} className="size-5 cursor-pointer mr-3" />
                  <MdDelete onClick={() => deletar(product.pro_cod)} className="cursor-pointer size-6" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>);
}