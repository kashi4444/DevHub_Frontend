import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
function App() {
  return (
    <>
       <BrowserRouter basename='/'>
          <Routes>
             <Route path='/' element={<div>Home Page</div>}/>
             <Route path='/login' element={<div>Login Page</div>}/>
             <Route path='/test' element={<div>Test Page</div>}/>
          </Routes>
       </BrowserRouter>
       <Navbar/>
      <h1 className='text-3xl font-bold underline'>Hello World</h1>
    </>
  )
}

export default App
