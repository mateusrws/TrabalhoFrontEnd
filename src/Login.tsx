import { useState } from 'react'
import './App.css'

export function Login() {


  return (
    <>
      
      <div className='bg-gray-300 mx-auto h-64 w-96'>
          <header className='bg-slate-700 h-12 w-96'>
            <h2 className='text-left ml-3 text-2xl border-8 border-slate-700'>Login</h2>
          </header>

          <label className='text-black' htmlFor="Username">Name</label>
          <input type="text" className='ml-1 mt-16 mb-8 border-none outline-0'  name='Username' placeholder='Username:'/>
          <br />
          <label className='text-black ' htmlFor="password">Senha</label>
          <input className='border-none outline-0' type="password" name='password' placeholder='Senha:'/>

          <p className='text-red-700 text-xs text-left ml-14 mt-4'>Não sou cadastrado</p>

      </div>

    </>
  )
}
