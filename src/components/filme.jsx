import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
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
        </CardActionArea>
    </Card>
  )
}

export default filme