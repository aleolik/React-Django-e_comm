
import React, {useRef,useEffect, useState,useContext} from 'react'

import axios from 'axios'
import {useNavigate,Outlet, useLocation} from 'react-router-dom'
import axiosInstance from '../axiosinstance';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { jsx } from '@emotion/react';

import {FaUserEdit} from 'react-icons/fa'
import  { AuthContext } from '../context/AuthProvider';

import AxiosPrivate from '../axiosinstance'

import useAuth from '../hooks/useAuth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Sezars
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

const Login = () => {
    const navigate = useNavigate()

    const location = useLocation()


    const from = location?.state?.from?.pathname || '/'

    const { auth,setAuth,persist_log,set_persist_log} = useAuth()





    const [password,setPassowrd] = useState('')


    const [username,Setusername] = useState('')


    const [errMSG,setErrMsg] = useState('')
    const errRef = useRef()

    useEffect(() => {
      set_persist_log(false)
    },[])
    // add email useEffect
    useEffect(() => {
      setErrMsg('')
    },[username,password]) // deletes error message after every update of inputs
  
    useEffect(() => {
      localStorage.setItem("persist",persist_log)
    },[persist_log])

  const handleSubmit = async(event) => {
    event.preventDefault();
      try{
        const url = `login/`
        const res = await axiosInstance.post(url,{
          user_name : username,
          password : password,
         },{
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
         })
         localStorage.setItem('refresh_token',res.data.refresh)
         const access_token = res.data.access
         const refresh_token = res.data.refresh
         // AxiosPrivate.defaults.headers['Authorization'] = `JWT ${access_token}` - the 401 error caused this
         setAuth(prev => {
          return{...prev,user_name:username,refresh_token:refresh_token,access_token:access_token}
         })
         navigate(from,{replace:true})
      }
      catch(e){
        setErrMsg(e.response.data)
      }
    }
  return (
    <div style={{'backgroundImage':'linear-gradient(#e66465, #9198e5)',height:100+'vh','paddingTop':5+'%'}}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container component="main" maxWidth="xs" className='reg_container'>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{'textAlign':'center'}}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit } noValidate sx={{ mt: 1 }}>
          {from && (from !== '/')
          ? (<h2 style={{'textAlign':'center'}}>You must be logged in  to access this Page</h2>)
          : (<h6></h6>)}
          <TextField
              margin="normal"
              required
              fullWidth
              name="user_name"
              label="Username"
              type="user_name"
              id="user_name"
              value={username}
              onChange = {(e) => {Setusername(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange = {(e) => {setPassowrd(e.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" className="persistCheck" id='persist'/>}
              label="Remember me"
              onChange={() => 
                {set_persist_log(!persist_log)

                }}
            />
             <p ref={errRef} className={errMSG ? "errmsg" : "offscreen"} aria-live="assertive">{errMSG}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  </div>
  );
}

export default Login

