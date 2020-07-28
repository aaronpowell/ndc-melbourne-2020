import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { SessionListContextProvider } from "./SessionListContextProvider";
import { ScheduleContextProvider } from "./ScheduleContextProvider";
import Agenda from "./pages/Agenda";
import MySchedule from "./pages/MySchedule";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";
import { Container } from "./components/Container";

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <SessionListContextProvider>
          <ScheduleContextProvider>
            <Container>
              <Nav />
              <Switch>
                <Redirect exact from="/" to="/agenda" />
                <Route exact path="/agenda/:day?" component={Agenda} />
                <Route path="/schedule/:day?" component={MySchedule} />
              </Switch>
            </Container>
          </ScheduleContextProvider>
        </SessionListContextProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
