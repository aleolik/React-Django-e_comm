import {useRef, useState} from 'react'


import { useEffect } from 'react';


import {useNavigate} from 'react-router-dom'



import InputAdornment from "@mui/material/InputAdornment";

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

import axiosInstance from '../axiosinstance';


import photo from '../static/goods_bg.jpg'

import {FaUserEdit} from 'react-icons/fa'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/about">
        Sezars
      </Link>{''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const [password,setPassowrd] = useState('')


  const [email,setEmail] = useState('')


  const [username,Setusername] = useState('')
  const [valid_username,Setvalid_username] = useState(false)

  const [username_focus,Setusername_focus] = useState(false)

  const [errMSG,setErrMsg] = useState(false)

  const [succesMsg,setSuccesMsg] = useState(false)


  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,25}$/




  const errRef = useRef()

  const succesRef = useRef()

  const usernameRef = useRef()




  const user_name_input = document.getElementById('user_name')

  const passowrd_input = document.getElementById('password')
  
  const email_input =document.getElementById('email')


  useEffect(() => {
    const result = USER_REGEX.test(username)
    Setvalid_username(result)
  },[username])


  // add email useEffect
  useEffect(() => {
    setErrMsg('')
  },[username,password,email]) // deletes error message after every update of inputs

  const handleSubmit = async(e) => {
    e.preventDefault()
    const url = `register/`
    if (username && password && email){
      if (valid_username){
          await axiosInstance.post(url,{
            email : email,
            user_name :username,
            password : password,
          }).then((res) => {
            setSuccesMsg('Account was created!Please Verificate your email')
            email_input.value = ''
            user_name_input.value = ''
            passowrd_input.value = ''
            setTimeout(() => {setSuccesMsg('')},5000)
          })
          .catch((e) => {
          if (e.response.data.length < 150){ // to prevent error in code
          setErrMsg(e.response.data)}
          else{
            setErrMsg('404,something  went wrong...')
          }
        })}
        else{
          setErrMsg('Username is not correct!Please follow the instructions above')
        }}
    else{
      setErrMsg('Please fill all the fields')
    }
};

  const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
      }}
    />
  );
};
  return (

    <div style={{'backgroundImage':`url(${photo})`,height:100+'vh','paddingTop':5+'%'}}>
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
          <Container component="main" maxWidth="xs"  className='reg_container'>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{'textAlign':'center'}}>
          
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit } noValidate sx={{ mt: 1 }}>
          <p id='usernameid' className={username_focus && username && !valid_username ? "instructions" : "offscreen"}>
                4 to 25 characters.Only English letters allowed.<br></br>
                Must begin with a letter.<br></br>
            </p>
          <TextField
              margin="normal"
              ref={usernameRef}
              required
              fullWidth
              name="user_name"
              aria-invalid={valid_username ? 'false' : 'true'}
              label="Username"
              type="user_name"
              id="user_name"
              aria-describedby='usernameid'
              onChange = {(e) => Setusername(e.target.value)}
              onFocus = {() => Setusername_focus(true)}
              onBlur = {() => Setusername_focus(false)}
              className = {username_focus && username && !valid_username ? "TextField" : "TextField.Mui-error"}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange = {(e) => {setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              aria-describedby='passwordid'
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e) => {setPassowrd(e.target.value)}}
            />
              <p ref={errRef} className={errMSG ? "errmsg" : "offscreen"} aria-live="assertive">{errMSG}</p>
              <p ref={succesRef} className={succesMsg ? "succesmsg" : "offscreen"} aria-live="assertive">{succesMsg}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already Have account?Login"}
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

