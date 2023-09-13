import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'
import React from 'react'

function filme(props) {
  return (
    <Card sx={{maxWidth: 345}}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={props.imagem}
                alt={props.titulo}
            />
            <CardContent>
                <Typography 
                    variant="h5" 
                    component="span">
                        {props.titulo}
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography 
                        variant="span" 
                        component="span">
                            {props.categoria}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography 
                        variant="span" 
                        component="span">
                            {props.ano}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography 
                        variant="span" 
                        component="span">
                            {props.duracao}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography 
                    variant="p" 
                    component="p">
                        {props.descricao}
                </Typography>
            </CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={props.excluir}>X</Button>
                </Grid>
                <Grid item xs={6}>
                    <Link href={ "edicao/" + props.id} sx={{display:"flex", flexFlow: "row", alignItems:"center"}}>Editar</Link>
                </Grid>
            </Grid>
            
        </CardActionArea>
    </Card>
  )
}

export default filme