import {Routes,Route,Link} from 'react-router-dom'
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
function App() {
  const [posts,setposts] = useState([])


  useEffect(() => {
    const GetCats = async() => {
      const url = `getlistofposts/`
      await axiosInstance.get(url).then((res) => {
        setposts(res.data)
      })
      GetCats()
    }
  },[])
  return (
    <div>
      <Routes>
              <Route path='/' element={<Layout/>}>
                <Route element={<NotLogin/>}>
                  <Route path="/login" element={<Login/>}></Route>
                </Route>
                <Route path="/register" element={<SignIn/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<Notfoundpage/>}/>
                <Route element={<RequireAuth/>}>
                  <Route element={<Mygoods/>} path='/mygoods'></Route>
                </Route>
                <Route path='/posts' element={<Goods/>}></Route>
                <Route element={<RequireAuth/>}>
                  <Route element={<Admin/>} path='/admin'></Route>
                </Route>
                <Route  index element={<Main/>}></Route>
                </Route>
                <Route path='/:name' element={<PostPage/>}></Route>
      </Routes>
    </div>
    
  )
}

export default App;
