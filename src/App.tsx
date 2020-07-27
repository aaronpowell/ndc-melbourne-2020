import React from "react";
import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { SessionListContextProvider } from "./SessionListContextProvider";
import Agenda from "./pages/Agenda";
import MySchedule from "./pages/MySchedule";

const Container = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App: React.FC = () => {
  return (
    <Router>
      <SessionListContextProvider>
        <Container>
          <Switch>
            <Redirect exact from="/" to="/agenda" />
            <Route exact path="/agenda/:day?" component={Agenda} />
            <Route path="/schedule" component={MySchedule} />
          </Switch>
        </Container>
      </SessionListContextProvider>
    </Router>
  );
};

export default App;
