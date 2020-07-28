import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Header, ConvertForm } from "./components";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <ConvertForm />
      </Container>
    </>
  );
}

export default App;
