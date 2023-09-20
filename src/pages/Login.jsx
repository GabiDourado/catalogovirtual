import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


function Login() {
  //cria constantes para o uso do usestate, para ser possível alterar o valor e ultilizar a primeira variante para exibi-la
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ lembrar, setLembrar ] = useState(false);
    const [ login, setLogin ] = useState(false);
    const [ erro, setErro] = useState(false);
    const navigate = useNavigate();
    // O useeffect foi usado para determinar a ação que ocorrerá caso o usuario esteja logado, com todas as informações corretamente colocadas
    useEffect( () => {
        if(login){
            setEmail(""); //zera o campo do email
            setSenha(""); //zera o campo da senha 
            navigate("/"); //direciona o usuário para a página inicial
        }
    }, [login]);
    function Autenticar(evento){ //essa função verifica as informações colocadas no campo, e verifica se o dados existem no servidor
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "login",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    senha: senha
                }
            )
        })
        .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
        .then( (json) => {
            if(json.user){ //se a resposta for transformada em json, vem a esse passo
              localStorage.setItem( "usuario" , json.user._id);
              setLogin(true); //se tudo estiver correto, ativa o login como verdadeiro e redireciona o usuário para a pagina inicial  
            }
            else{
              localStorage.removeItem( "usuario" );
              setErro(true); //se a resposta for 401, que representa um erro, a variável do erro se torna verdadeira e aciona os acontecimentos que indicam ao usuário qua algo está errado
            }
        })
        .catch( (erro) => {setErro(true)}) //se algo não funcionar, indica um erro ao usuário
    }
  return (
      <Container component="section" maxWidth="xs" >
          <Box 
          sx={{
              mt: 15,
              mb: 15,
              backgroundColor:"#a172d8",
              padding: "45px",
              borderRadius:"10px",
              display:"flex",
              flexDirection:"column",
              alignItems:"center"
          }}>
              <Typography 
                component="h1" 
                variant="h4">Login</Typography>
              {erro && (<Alert  variant="outlined"  severity="warning">Revise seus dados e tente novamente</Alert>/*exibe um alerta para o usuário saber que algo está errado*/ )}
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
                          <Link  href="/trocarsenha/:id"
                          sx={{
                      textDecoration:"none",
                      color:"black",
                      fontSize: "1.2rem"
                    }}>Esqueci a senha</Link>
                      </Grid>
                      <Grid item>
                          <Link href="/cadastro"
                          sx={{
                            textDecoration:"none",
                            color:"black",
                            fontSize: "1.2rem"
                          }}>Cadastrar-se</Link>
                      </Grid>
                  </Grid>
                  <Grid xs={5} sx={{
                    textAlign:"center",
                    mt: 1,
                    mb: 0
                  }}>
                    <Link href="/" sx={{
                      textDecoration:"none",
                      color:"black",
                      fontSize: "1.2rem"
                    }}>Voltar a página inicial</Link>
                  </Grid>
              </Box>
          </Box>
      </Container>
  )
}

export default Login;