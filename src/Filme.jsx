import { Alert, Box, Button, Container, TextField, Typography} from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';

function Filme() {
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
        fetch(process.env.REACT_APP_BACKEND + "filmes",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
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
    <Container component="section" maxWidth="sm">
        <Box 
        sx={{
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
                variant="h4">Filmes:</Typography>
                {erro && (<Alert severity="warning" variant="outlined">Algo deu errado, ou o filme já está cadastrado, por favor, tente novamente</Alert>)}
                {adiciona && (<Alert severity="success" variant="outlined">Filme registrado com sucesso!</Alert>)}
            <Box component="form" onSubmit={Enviar}>
                <TextField
                    type="text" 
                    label="Título" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={titulo}
                    onChange={(e) => setTitulo( e.target.value )}
                />
                <TextField
                    type="text" 
                    label="Descrição" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={descricao}
                    onChange={(e) => setDescricao( e.target.value )}
                />
                <TextField
                    type="text" 
                    label="Ano" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={ano}
                    onChange={(e) => setAno( e.target.value )}
                />
                <TextField
                    type="text" 
                    label="Duração" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={duracao}
                    onChange={(e) => setDuracao( e.target.value )}
                />
                <TextField 
                    type="text" 
                    label="Categoria" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={categoria}
                    onChange={(e) => setCategoria( e.target.value )}
                />
                <TextField 
                    type="url" 
                    label="Insira o link de uma imagem do filme" 
                    variant="filled" 
                    margin="normal" 
                    fullWidth
                    value={imagem}
                    onChange={(e) => setImagen( e.target.value )}
                />
                <Box component="figure" sx={{
                    margin: "0 auto",
                    display: 'flex',
                    justifyContent: "center",
                    width: "300px"
                }}>
                    <img src={imagem} alt={titulo} style={{ width: "100%" }} />
                </Box>
                <Button
                    type='submit'
                    variant="contained"  
                    fullWidth sx={{mt:1, mb:1}}>Enviar</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default Filme