import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";

//redux
const admin = false;
function reducer(state = admin, action: any) {
  if (action.type === "권한") {
    return action.adminId;
  } else if (action.type === "취소") {
    return action.adminId;
  }
}

let store = createStore(reducer);

//react 기본 실행 코드
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>
);
