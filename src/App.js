import React from "react";
import "./App.css";
import Liste from "./Liste";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Switch, Route, link } from "react-router-dom";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;
<script src="https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js"></script>;

const App = () => {
  return (
    <>
      <Liste />
    </>
  );
};

export default App;
