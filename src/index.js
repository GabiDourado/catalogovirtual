import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Filme from './Filme';
import EditaFilme from './EditaFilme';

const theme = createTheme({
  palette: {
      mode: 'dark',
      primary: {
        main: '#5f227b',
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
    path: "/filmes",
    element: <Filme/>
  },
  {
    path:"/edicao/:id",
    element: <EditaFilme/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
