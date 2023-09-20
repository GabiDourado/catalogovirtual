import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function Produto(props) {
  return (
    <Card sx={{maxWidth: 340, maxHeight: 450}}>
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
                    <Grid item xs={4}>
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
            <Grid container sx={{ display:"flex", flexFlow:"row", alignItems:"center"}}>
                <Grid item xs={10}>
                    <Button onClick={props.excluir} ><DeleteForeverIcon sx={{color:"purple"}}/></Button>
                </Grid>
                <Grid item xs>
                    <Link href={ "edicao/" + props.id}><EditIcon  sx={{color:"purple"}}/></Link>
                </Grid>
            </Grid>
            
        </CardActionArea>
    </Card>
  )
}

export default Produto