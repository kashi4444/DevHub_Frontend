import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Body from "./Body"
import Profile from "./Profile"

function App() {
  return (
    <>
       <BrowserRouter basename='/'>
          <Routes>
             <Route path='/' element={<Body/>}>
               <Route path='/login' element={<Login/>}></Route>
               <Route path='/profile' element={<Profile/>}></Route>
             </Route>
          </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
