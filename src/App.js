import { Avatar, Button } from "@mui/material";

function App(props) {
  return (
    <>
      <Button variant="outlined" color="secondary">Outlined</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="text" color="secondary">Text</Button>
      <Avatar alt="Gabi" src="/static/images/avatar/3.jpg" />
    </>
  );
}

export default App;
