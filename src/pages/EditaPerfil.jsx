import { Box, Button, Container, TextField, Typography, Alert, Grid,  Link } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditaPerfil( props) {
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ telefone, setTel ] = useState("");
    const [ nome, setNome ] = useState("");
    const [ cpf, setCpf ] = useState("");
    const [ imagem, setImagen] = useState("");
    const [ cadastro, setCadastro ] = useState(false);
    const [ erro, setErro ] = useState(false);

    function Cadastrar( e ){
        e.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "users",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome:nome,
                    email: email,
                    cpf: cpf,
                    telefone: telefone,
                    senha: senha
                }
            )
        })
        .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
        .then( (json) => {
            if(json.cpf){ //se a resposta for transformada em json, vem a esse passo
                setCadastro(true); //se a resposta for 401, que representa um erro, a variável do erro se torna verdadeira e aciona os acontecimentos que indicam ao usuário qua algo está errado
                setErro(false);
            }
            else{
                setErro(true); //se tudo estiver correto, ativa o login como verdadeiro e redireciona o usuário para a pagina inicial
                setCadastro(false);
            }
        })
        .catch( (erro) => {setErro(true)}) //se algo não funcionar, indica um erro ao usuário
    }
    useEffect( () => {
        setNome("");
        setEmail("");
        setCpf("");
        setTel("");
        setSenha("");
        //setCadastro(false);
    },[cadastro]);
  return (
    <Container component="section" maxWidth="sm">
        <Box sx={{
            mt:12,
            backgroundColor:"#a172d8",
            padding: "50px",
            borderRadius:"10px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
             <Typography 
                component="h1" 
                variant="h4">Edite seu Perfil:</Typography>
                {erro && (<Alert severity="warning" variant="outlined">{erro}</Alert>)}
                {cadastro && (<Alert severity="success" variant="outlined">Perfil editado com sucesso!</Alert>)}
            <Box component="form" onSubmit={Cadastrar}>
            <TextField
                    type="text" 
                    label="Nome" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={nome}
                    onChange={(e) => setNome( e.target.value )}
                    required
                />
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
                    type="tel" 
                    label="Telefone" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={telefone}
                    onChange={(e) => setTel( e.target.value )}
                    required
                />
                <TextField
                    type="text" 
                    label="CPF" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={cpf}
                    onChange={(e) => setCpf( e.target.value )}
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
                <Box component="figure" sx={{
                    margin: "0 auto",
                    display: 'flex',
                    justifyContent: "center",
                    width: "300px"
                }}>
                    <img src={imagem} alt={nome} style={{ width: "100%" }} />
                </Box>
                <Button
                    type='submit'
                    variant="contained"  
                    fullWidth sx={{mt:1, mb:1}}>Editar</Button>
                      <Grid xs={5} sx={{
                        textAlign:"center",
                        mt: 1,
                        mb: 0,
                    }}>
                        <Button variant="outlined" href="/perfil/:id" sx={{
                            textDecoration:"none",
                            color:"black",
                        }}> Voltar</Button>
                  </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default EditaPerfil