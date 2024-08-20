import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./Login"
import { Home } from "./pages/Home"
import { Cadastrar } from "./pages/Cadastro"
import { CadPro } from "./pages/CadPro"
import { Comprar } from "./pages/Comprar"
import { MeuPerfil } from "./pages/Meuperfil"
import { UpdateProd } from "./pages/UpadateProd"



export function RouteApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cadastrar" element={<Cadastrar/>}/>
        <Route path="/cadPro" element={<CadPro/>}/>
        <Route path="/comprar" element={<Comprar/>}/>
        <Route path="/meuperfil" element={<MeuPerfil/>}/>
        <Route path="/update/:cod" element={<UpdateProd/>}/>
      </Routes>
    </BrowserRouter>
  )
}