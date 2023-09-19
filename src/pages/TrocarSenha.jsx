import { Alert, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


function TrocarSenha() {
  //cria constantes para o uso do usestate, para ser possível alterar o valor e ultilizar a primeira variante para exibi-la
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ confirmasenha, setConfirma] = useState("");
    const [ troca, setTroca ] = useState(false);
    const [ erro, setErro] = useState(false);
    const navigate = useNavigate();
    // O useeffect foi usado para determinar a ação que ocorrerá caso o usuario esteja logado, com todas as informações corretamente colocadas
    useEffect( () => {
        if(troca){
            localStorage.setItem( "usuario", JSON.stringify( {email:email})); //salva o usuário no localstorage 
            setEmail(""); //zera o campo do email
            setSenha(""); //zera o campo da senha 
            setConfirma("");
            navigate("/login"); //direciona o usuário para a página inicial
        }
    }, [troca]);
    function Autenticar(evento){ //essa função verifica as informações colocadas no campo, e verifica se o dados existem no servidor
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "users",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
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
              setTroca(true);
              setErro(false); //se tudo estiver correto, ativa o login como verdadeiro e redireciona o usuário para a pagina inicial  
            }
            else{
              setErro(true);
              setTroca(false); //se a resposta for 401, que representa um erro, a variável do erro se torna verdadeira e aciona os acontecimentos que indicam ao usuário qua algo está errado
            }
        })
        .catch( (erro) => {setErro(true)}) //se algo não funcionar, indica um erro ao usuário
    }
  return (
      <Container component="section" maxWidth="xs" >
          <Box 
          sx={{
                mt: 13,
                mb: 13,
              backgroundColor:"#a172d8",
              padding: "45px",
              borderRadius:"10px",
              display:"flex",
              flexDirection:"column",
              alignItems:"center"
          }}>
              <Typography 
                component="h1" 
                variant="h4">Trocar Senha</Typography>
              {erro && (<Alert  variant="outlined"  severity="warning">Algo deu errado, por favor, tente novamente</Alert>/*exibe um alerta para o usuário saber que algo está errado*/ )}
              { troca && (<Alert variant="outlined" severity="success">Senha alterada com sucesso!</Alert>)}
              <Box component="form" onSubmit={Autenticar}>
                  <TextField 
                    type="email" 
                    label="Email" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail( e.target.value )}
                    required
                  />
                  <TextField 
                    type="password" 
                    label="Senha" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={senha}
                    onChange={(e) => setSenha( e.target.value )}
                    required
                  />
                  <TextField 
                    type="password" 
                    label="Confirmar Senha" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={confirmasenha}
                    onChange={(e) => setConfirma( e.target.value )}
                    required
                  />
                  <Button 
                    type='submit'
                    variant="contained"  
                    fullWidth sx={{mt:1, mb:1}}>Trocar</Button>
                    <Grid xs={5} sx={{
                        textAlign:"center",
                        mt: 1,
                        mb: 0,
                    }}>
                    <Button variant="outlined" href="/login" sx={{
                          textDecoration:"none",
                          color:"black",
                        }}> Voltar</Button>
                  </Grid>
              </Box>
          </Box>
      </Container>
  )
}

export default TrocarSenha;