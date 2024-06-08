import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./Login"
import { Home } from "./pages/Home"


export function RouteApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}