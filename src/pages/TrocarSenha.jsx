import { Alert, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


function TrocarSenha() {
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ confirmasenha, setConfirma ] = useState("");
    const [ troca, setTroca ] = useState(false);
    const [ erro, setErro ] = useState(false);
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
              <Box component="form">
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