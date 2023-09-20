import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Produto from "./pages/components/Produto"
import "./global.css"

import MenuTeste from "./pages/components/MenuTeste";

function App(props) {
  const [jogos, setJogos] = useState();
  const [erro, setErro] = useState();
  const usuario = localStorage.getItem("usuario");
  useEffect(()=>{
    fetch(process.env.REACT_APP_BACKEND + "produtos/" + usuario,{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
      method:"GET",
      headers:{
          'Content-Type': 'application/json'
      },
  })
  .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
  .then( (json) => {setJogos (json)})
  .catch( (erro) => {setErro(true)})
  },[])
  function Excluir(evento, id){ //essa função verifica as informações colocadas no campo, e verifica se o dados existem no servidor
    evento.preventDefault();
    fetch(process.env.REACT_APP_BACKEND +  "produtos",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
               id:id,
               usuario: usuario
            }
        )
    })
    .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
    .then( (json) => {
      const novalista = jogos.filter((jogos) => jogos._id !== id );
      setJogos(novalista);
    })
    .catch( (erro) => {setErro(true)}) //se algo não funcionar, indica um erro ao usuário
}
  return (
    <>
      <MenuTeste/>
      <h1 style={{textAlign:"center"}}>Jogos</h1>
      <Container
        sx={{
          display:"flex",
          flexFlow:"row",
          flexWrap:"wrap",
          gap: "1rem",
          justifyContent:"center"
        }}>
           {jogos && (
          jogos.map((jogo,index) => (
            <Produto
              imagem={jogo.imagem}
              titulo={jogo.titulo}
              ano={jogo.ano}
              duracao={jogo.duracao}
              categoria={jogo.categoria}
              descricao={jogo.descricao}
              excluir={ ( e ) => Excluir( e, jogo._id ) }
              id= {jogo._id}
            />
          ))
        )}

      </Container>
    </>
  );
}

export default App;
