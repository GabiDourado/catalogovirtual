import { Avatar, Button, Grid} from '@mui/material'
import React from 'react'

function Menu( props) {
  return (
    <Grid container sx={{
        backgroundColor: "#D781FF",
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        height: "4rem"
    }}>
        <Grid item xs={10} sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "8rem"
        }}>
            <Button sx={{
                borderRadius: "30px",
                width: "28rem",
                height: "2.7rem",
            }} variant='contained'
            >Novo Jogo</Button>
        </Grid>
        <Grid item xs={1} sx={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Avatar 
                alt={props.nome} 
                src={props.imagem}
                sx={{
                    backgroundColor: "#A011E4",
                    width: "3rem",
                    height: "3rem",
                    marginLeft: "3rem"
                }}
            />
        </Grid>
    </Grid>
  )
}

export default Menu