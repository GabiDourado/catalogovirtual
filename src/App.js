import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filme from "./components/filme"

function App(props) {
  const [filmes, setFilmes] = useState();
  const [erro, setErro] = useState();
  useEffect(()=>{
    fetch(process.env.REACT_APP_BACKEND + "filmes",{ //o fetch é o que dá as condições da verificação, direciona o servidor e o que deve ser verificado
      method:"GET",
      headers:{
          'Content-Type': 'application/json'
      },
  })
  .then( (resposta) => resposta.json()) //se a autenticação funcionar, transforma a resposta em json
  .then( (json) => {setFilmes (json)})
  .catch( (erro) => {setErro(true)})
  },[])
  return (
    <>
      <h1>Filmes</h1>
      <Container sx={{
        display:"flex",
        flexFlow:"row",
        flexWrap:"wrap",
        gap: "1.5rem",
        alignItems: "center",
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
            />
          ))
        )}
      </Container>
      <Button variant="outlined" color="secondary">Outlined</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="text" color="secondary">Text</Button>
      <Avatar alt="Gabi" src="/static/images/avatar/3.jpg" />
    </>
  );
}

export default App;
