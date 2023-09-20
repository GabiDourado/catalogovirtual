import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Button, Tooltip, Avatar, Link } from '@mui/material'
import React from 'react'
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';

function MenuTeste(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const usuario = localStorage.getItem("usuario");
    const { id } = useParams();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl"
                sx={{
                    backgroundColor: "#D781FF"
                }}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Jogos
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, textAlign: "center" }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link href="/novojogo" sx={{ textDecoration: "none", color: "white" }}>Novo Jogo</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Jogos
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
                        <Button
                            sx={{
                                width: "28rem",
                                height: "3rem",
                                borderRadius: "30px",
                                my: 2,
                                color: 'white',
                                display: 'block',
                                textAlign:"center",
                                padding:"0.8rem"
                            }} variant='contained'
                            onClick={handleCloseNavMenu}
                            href="/novojogo"
                        >
                            Novo Jogo
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir Opções">
                            <IconButton onClick={handleOpenUserMenu}
                                sx={{
                                    p: 0

                                }}>
                                <Avatar
                                    alt={props.nome}
                                    src={props.imagem}
                                    sx={{
                                        bgcolor: "#A011E4",
                                        width: "3rem",
                                        height: "3rem",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button sx={{ textDecoration: "none", color: "white", width:"100%" }} href={"/perfil"}>Perfil</Button>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button sx={{ textDecoration: "none", color: "white" , width:"100%"}} href="/login">Entrar</Button>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button sx={{ textDecoration: "none", color: "white" , width:"100%"}} href="/cadastro">Cadastrar</Button>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button onClick={()=> {
                                    localStorage.removeItem("usuario");
                                    alert("Você saiu da sua conta")}} 
                                sx={{ textDecoration: "none", color: "white", width:"100%" }}>Sair da Conta</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default MenuTeste