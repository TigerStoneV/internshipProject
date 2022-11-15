import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalStyle />
    <Router />
  </>
);
