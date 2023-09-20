import React from 'react'
import MenuTeste from './components/MenuTeste'
import { Avatar, Box, Container, Link, Typography } from '@mui/material'
import Controle from "./img/controlesemfundo.png";
import Carinha from "./img/carinhafeliz.png";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* "_id": "650adff42a26e4e19b776104",*/
function Perfil(props) {
    const [ email, setEmail ] = useState("");
    const [ telefone, setTel ] = useState("");
    const [ nome, setNome ] = useState("");

    useEffect(()=> {
      const usuario = localStorage.getItem("usuario");
      fetch(process.env.REACT_APP_BACKEND + "usuarios/" + usuario,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      .then( (resposta) => resposta.json() )
      .then( (json) => {
        setEmail( json.email );
        setNome( json.nome );
        setTel( json.telefone);

      })
    },[])
  return (
    <>
      <MenuTeste/>
        <Container component="div" maxWidth="lg" sx={{backgroundColor:"#EFCDFF", borderRadius:"30px", mt:"2rem", mb:"2rem", padding:"1rem"}}>
          <Box sx={{display: "flex"}}>
              <Box sx={{ width:"25%"}}>
                <img alt="carinha" style={{
                  width:"100%",
                }} src={Carinha}></img>
              </Box>
              <Box sx={{
                textAlign: "center", display: "flex", flexFlow:"column"
              }}>
                <Avatar src={props.foto}
                  alt={props.nome}
                  sx={{
                    width:"15rem",
                    height:"15rem",
                    margin:"1rem 10.5rem",
                    borderRadius:"50px",
                    backgroundColor: "#A011E4"
                  }}
                ></Avatar>
                <Typography variant="span"  sx={{padding:"0.3rem", fontSize:"2rem"}}>{nome}</Typography>
                <Typography variant="span"  sx={{padding:"0.3rem", fontSize:"2rem"}}>{email}</Typography>
                <Typography variant="span"  sx={{padding:"0.3rem", fontSize:"2rem"}}>{telefone}</Typography>
              </Box>
          </Box>
          <Box sx={{display:"flex"}}>
            <Box sx={{ display:"flex"}}>
                  <Link href="/editaperfil/:id" sx={{paddingTop:"3rem",paddingBottom:"0.3rem", paddingRight:"3rem", paddingLeft:"25rem", fontSize:"2rem", textDecoration:"none", color:"black"}}><Typography variant="span"  >Editar Perfil</Typography></Link>
                  <Typography variant="span"  sx={{paddingTop:"3rem",paddingBottom:"0.3rem", paddingRight:"10rem", fontSize:"2rem"}}>Sair da conta</Typography>
            </Box>
            <Box sx={{
              width:"20%",
              marginTop:"-3rem"
            }}>
              <img alt='controle' style={{
                width:"100%"
              }} src={Controle}></img>
            </Box>
          </Box>
        </Container>
    </>
  )
}

export default Perfil