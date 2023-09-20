import { Alert, Box, Button, Container, TextField, Typography, Grid, Link} from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';

function Produtos() {
    const [ titulo, setTitulo] = useState("");
    const [ descricao, setDescricao] = useState("");
    const [ ano, setAno ] = useState("");
    const [ duracao, setDuracao ] = useState("");
    const [ categoria, setCategoria ] = useState("");
    const [ imagem, setImagen] = useState("");
    const [ adiciona, setAdiciona ] = useState(false);
    const [ erro, setErro ] = useState(false);
    function Enviar(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "produtos",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    usuario: localStorage.getItem("usuario"),
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao ,
                    categoria: categoria ,
                    imagem: imagem
                }
            )
        })
        .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
        .then( (json) => {
            if(json._id){ //se a resposta for transformada em json, vem a esse passo
                setAdiciona(true); //se a resposta for 401, que representa um erro, a variável do erro se torna verdadeira e aciona os acontecimentos que indicam ao usuário qua algo está errado
                setErro(false);
            }
            else{
                setErro(true); //se tudo estiver correto, ativa o login como verdadeiro e redireciona o usuário para a pagina inicial
                setAdiciona(false);
            }
        })
        .catch( (erro) => {setErro(true)}) //se algo não funcionar, indica um erro ao usuário
    }
    useEffect( () => {
        setTitulo("");
        setDescricao("");
        setAno("");
        setDuracao("");
        setCategoria("");
        setImagen("");
    },[adiciona]);

  return (
    <>
        <Container component="section" maxWidth="sm">
            <Box 
            sx={{
                mt: 3,
                mb: 3,
                backgroundColor:"#a172d8",
                padding: "45px",
                borderRadius:"10px",
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Typography 
                    component="h1" 
                    variant="h4">Novo Jogo:</Typography>
                    {erro && (<Alert severity="warning" variant="outlined">Algo deu errado, ou o jogo já está cadastrado, por favor, tente novamente</Alert>)}
                    {adiciona && (<Alert severity="success" variant="outlined">Jogo registrado com sucesso!</Alert>)}
                <Box component="form" onSubmit={Enviar}>
                    <TextField
                        type="text" 
                        label="Nome do Jogo" 
                        variant="filled" 
                        margin="normal" 
                        fullWidth
                        value={titulo}
                        onChange={(e) => setTitulo( e.target.value )}
                        required
                    />
                    <TextField
                        type="text" 
                        label="Descrição" 
                        variant="filled" 
                        margin="normal" 
                        fullWidth
                        value={descricao}
                        onChange={(e) => setDescricao( e.target.value )}
                        required
                    />
                    <TextField
                        type="text" 
                        label="Ano" 
                        variant="filled" 
                        margin="normal" 
                        fullWidth
                        value={ano}
                        onChange={(e) => setAno( e.target.value )}
                        required
                    />
                    <TextField
                        type="text" 
                        label="Tempo de jogo" 
                        variant="filled" 
                        margin="normal" 
                        fullWidth
                        value={duracao}
                        onChange={(e) => setDuracao( e.target.value )}
                        required
                    />
                    <TextField 
                        type="text" 
                        label="Categoria" 
                        variant="filled" 
                        margin="normal" 
                        fullWidth
                        value={categoria}
                        onChange={(e) => setCategoria( e.target.value )}
                        required
                    />
                    <TextField 
                        type="url" 
                        label="Insira o link de uma imagem do Jogo" 
                        variant="filled" 
                        margin="normal" 
                        fullWidth
                        value={imagem}
                        onChange={(e) => setImagen( e.target.value )}
                        required
                    />
                    <Box component="figure" sx={{
                        margin: "0 auto",
                        display: 'flex',
                        justifyContent: "center",
                        width: "300px"
                    }}>
                        <img src={imagem} alt="" style={{ width: "100%" }} />
                    </Box>
                    <Button
                        type='submit'
                        variant="contained"  
                        fullWidth sx={{mt:1, mb:1}}>Enviar</Button>
                    <Grid xs={5} sx={{
                        textAlign:"center",
                        mt: 1,
                        mb: 0,
                    }}>
                        <Link href="/" sx={{
                        textDecoration:"none",
                        color:"black",
                        fontSize: "1.3rem",
                        }}><Button variant="outlined" sx={{
                            color:"black"
                        }}> Voltar</Button></Link>
                  </Grid>
                </Box>
            </Box>
        </Container>
    </>
  )
}

export default Produtos