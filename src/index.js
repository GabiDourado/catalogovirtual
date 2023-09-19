import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Jogo from './pages/Produtos';
import EditaFilme from './pages/EditaProduto';
import TrocarSenha from './pages/TrocarSenha';
import Perfil from './pages/Perfil';
import EditaPerfil from './pages/EditaPerfil';

const theme = createTheme({
  palette: {
      mode: 'light',
      primary: {
        main: '#A011E4',
      },
      secondary: {
        main: '#d4a8ec',
      },
      background: {
        default: '#a172d8',
        paper: '#905fb1',
      },
      text: {
        primary: '#EDE9F2',
        secondary: '#DED0F2',
        disabled: '#D2BBF2',
        hint: '#8E6BBF',
      },
      error: {
        main: '#ff002b',
      },
      warning: {
        main: '#fddb29',
      },
      info: {
        main: '#0f96ff',
      },
      success: {
        main: '#29f532',
      },
    },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/novojogo",
    element: <Jogo/>
  },
  {
    path:"/edicao/:id",
    element: <EditaFilme/>
  },
  {
    path:"/trocarsenha/:id",
    element: <TrocarSenha/>
  },
  {
    path: "/perfil/:id",
    element: <Perfil/>
  }, 
  {
    path:"/editaperfil/:id",
    element: <EditaPerfil/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
