import { Box, Button, Container, TextField, Typography, Alert, Grid } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditaProduto(props) {
    const { id } = useParams();
    const [ titulo, setTitulo] = useState("");
    const [ descricao, setDescricao] = useState("");
    const [ ano, setAno ] = useState("");
    const [ duracao, setDuracao ] = useState("");
    const [ categoria, setCategoria ] = useState("");
    const [ imagem, setImagen] = useState("");
    const [ edita, setEdita ] = useState(false);
    const [ erro, setErro ] = useState(false);
    const usuario = localStorage.getItem("usuario");

    useEffect(( ) => {
        fetch(process.env.REACT_APP_BACKEND + "produtos/" + usuario +"/" + id,{ 
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then( (resposta) => resposta.json()) 
        .then( (json) => {
            if(!json.status){
                setTitulo(json.titulo);
                setDescricao(json.descricao);
                setAno(json.ano);
                setDuracao(json.duracao);
                setCategoria(json.categoria);
                setImagen(json.imagem);
            }
            else{
                setErro("Filme não encontrado");
            }
        })
        .catch( (erro) => {setErro(true)}) 
    }, [] );
    function Editar(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "produtos/",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
            method:"PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id:id,
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao ,
                    categoria: categoria ,
                    imagem: imagem,
                    usuario: usuario
                }
            )
        })
        .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
        .then( (json) => {
            if(json._id){ //se a resposta for transformada em json, vem a esse passo
                setEdita(true); //se a resposta for 401, que representa um erro, a variável do erro se torna verdadeira e aciona os acontecimentos que indicam ao usuário qua algo está errado
                setErro(false);
            }
            else{
                setErro(true); //se tudo estiver correto, ativa o login como verdadeiro e redireciona o usuário para a pagina inicial
                setEdita("Não foi possível editar o jogo");
            }
        })
        .catch( (erro) => {setErro("Erro ao processar sua requisição")})
    }
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
                variant="h4">Edite seu Jogo:</Typography>
                {erro && (<Alert severity="warning" variant="outlined">{erro}</Alert>)}
                {edita && (<Alert severity="success" variant="outlined">Jogo editado com sucesso!</Alert>)}
            <Box component="form" onSubmit={Editar}>
            <TextField
                    type="text" 
                    label="Nome do jogo" 
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
                    label="Tempo de jogo" 
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
                    label="Insira o link de uma imagem do Jogo" 
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
                    fullWidth sx={{mt:1, mb:1}}>Editar</Button>
                     <Grid xs={5} sx={{
                        textAlign:"center",
                        mt: 1,
                        mb: 0,
                    }}>
                        <Button variant="outlined" href="/" sx={{
                            textDecoration:"none",
                            color:"black",
                        }}> Voltar</Button>
                  </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default EditaProduto