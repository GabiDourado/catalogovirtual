import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./global.css"
import Menu from "./components/Menu";

function App(props) {
  const [filmes, setFilmes] = useState();
  const [erro, setErro] = useState();
  useEffect(()=>{
    fetch(process.env.REACT_APP_BACKEND + "produto",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
      method:"GET",
      headers:{
          'Content-Type': 'application/json'
      },
  })
  .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
  .then( (json) => {setFilmes (json)})
  .catch( (erro) => {setErro(true)})
  },[])
  function Excluir(evento, id){ //essa função verifica as informações colocadas no campo, e verifica se o dados existem no servidor
    evento.preventDefault();
    fetch(process.env.REACT_APP_BACKEND + "produto",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
               id:id
            }
        )
    })
    .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
    .then( (json) => {
      const novalista = filmes.filter((filmes) => filmes._id !== id );
      setFilmes(novalista);
    })
    .catch( (erro) => {setErro(true)}) //se algo não funcionar, indica um erro ao usuário
}
  return (
    <>
      <Menu/>
      <h1 style={{textAlign: "center", fontSize: "2rem"}}>Jogos</h1>
      
    </>
  );
}

export default App;
/*<Container sx={{
        display:"flex",
        flexFlow:"row",
        flexWrap:"wrap",
        gap: "1rem",
        justifyContent:"center"
      }}>
        {filmes && (
          filmes.map((filme,index) => (
            <Filme 
              imagem={filme.imagem}
              titulo={filme.titulo}
              ano={filme.ano}
              duracao={filme.duracao}
              categoria={filme.categoria}
              descricao={filme.descricao}
              excluir={ ( e ) => Excluir( e, filme._id ) }
              id= {filme._id}
            />
          ))
        )}
      </Container>*/