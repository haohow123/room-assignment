import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App people={4} rooms={[
        { roomId: "202101", min: 1, max: 4 },
        { roomId: "202102", min: 0, max: 4 },
    ]}/>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
