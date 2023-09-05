import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#5f227b',
        },
        secondary: {
          main: '#d4a8ec',
        },
        background: {
          default: '#a172d8',
          paper: '#905fb1',
        },
        text: {
          primary: '#EDE9F2',
          secondary: '#DED0F2',
          disabled: '#D2BBF2',
          hint: '#8E6BBF',
        },
        error: {
          main: '#ff002b',
        },
        warning: {
          main: '#fddb29',
        },
        info: {
          main: '#0f96ff',
        },
        success: {
          main: '#29f532',
        },
      },
})
function Login() {
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ lembrar, setLembrar ] = useState(false);
    const [ login, setLogin ] = useState(false);
    const [ erro, setErro] = useState(false);
    const navigate = useNavigate();
    useEffect( () => {
        if(login){
            localStorage.setItem( "usuario", JSON.stringify( {email:email}));
            setEmail("");
            setSenha("");
            navigate("/");
        }
    }, [login]);
    function Autenticar(evento){
        evento.preventDefault();
        fetch("https://api.escuelajs.co/api/v1/auth/login",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: senha
                }
            )
        })
        .then( (resposta) => resposta.json())
        .then( (json) => {
            if(json.statusCode === 401 ){
                setErro(true);
            }
            else{
                setLogin(true);
            }
        })
        .catch( (erro) => {setErro(true)})
    }
  return (
    <ThemeProvider theme={theme}>
        <Container component="section" maxWidth="xs">
            <Box 
            sx={{
                mt:15,
                backgroundColor:"#a172d8",
                padding: "50px",
                borderRadius:"10px",
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Typography 
                component="h1" 
                variant="h4">Login</Typography>
                <Box component="form" onSubmit={Autenticar}>
                    <TextField 
                    type="email" 
                    label="Email" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail( e.target.value )}
                    />
                    <TextField 
                    type="password" 
                    label="Senha" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={senha}
                    onChange={(e) => setSenha( e.target.value )}
                    />
                    <FormControlLabel
                        control={<Checkbox value={lembrar} name='lembrar' onChange={(e) => setLembrar(!lembrar)}/>}
                        label="Lembre-se de mim"
                    />
                    <Button 
                    type='submit'
                    variant="contained"  
                    fullWidth sx={{mt:1, mb:1}}>Enviar</Button>
                    <Grid container>
                        <Grid item xs>
                            Esqueci a senha
                        </Grid>
                        <Grid item>
                            Cadastrar-se
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  )
}

export default Login;