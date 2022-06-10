import {Routes,Route,Link, Navigate} from 'react-router-dom'
import About from './pages/About';
import Login from './pages/Login';
import SignIn from './pages/Registrtation';
import Notfoundpage from './pages/Notfoundpage'
import './App.css';
import Header from './components/Header';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Goods from './pages/Goods';

import Main from './pages/Main';

import Mygoods from './pages/Mygoods'

import RequireAuth from './components/RequireAuth';

import Admin from './pages/Admin';

import AuthProvider from './context/AuthProvider';

import Layout from './pages/Layout';

import NotLogin from './hooks/NotLogin';

import axiosInstance from './axiosinstance';


import PostPage from './pages/PostPage';

import ActivateAccPage from './pages/ActivateAccPage';

import UsePersistLogin from './hooks/UsePersistLogin';
function App() {
 
  return (
    <div>
      <Routes>
            {/* public routes*/}
            <Route path='/' element={<Layout/>}>
              <Route element={<UsePersistLogin/>}>
                <Route  index element={<Main/>}></Route>
                <Route element={<NotLogin/>}>
                  <Route path="/login" element={<Login/>}></Route>
                </Route>

                <Route path="/register" element={<SignIn/>}/>

                <Route path="/about" element={<About/>}/>

                <Route path='/posts' element={<Goods/>}></Route>

                <Route path='posts/post/:name' element={<PostPage/>}></Route>

                <Route path="*" element={<Navigate to='not-found-page'/>}/>

                <Route path="not-found-page" element={<Notfoundpage/>}/>

                <Route path='Activation_link/:user_name' element={<ActivateAccPage/>}></Route>

                {/* private routes*/}
                  <Route element={<RequireAuth/>}>
                    <Route element={<Mygoods/>} path='/mygoods'></Route>
                  </Route>
                  <Route element={<RequireAuth/>}>
                    <Route element={<Admin/>} path='/admin'></Route>
                  </Route>
              </Route>
            </Route>
      </Routes>
    </div>
    
  )
}

export default App;
