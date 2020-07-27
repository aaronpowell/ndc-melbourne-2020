import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchAgenda, Agenda } from "./fetchAgenda";
import Day from "./components/Day";
import styled from "styled-components";
import TabControl from "./components/Tab";
import { BrowserRouter as Router } from "react-router-dom";

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
  const [agenda, setAgenda] = useState<Agenda>();
  const [loaded, setLoaded] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    const loader = async () => {
      const agenda = await fetchAgenda();
      setAgenda(agenda);
      setLoaded(true);
    };

    loader();
  }, []);

  let body: React.ReactNode;

  if (!agenda || !loaded) {
    body = (
      <div className="App">
        <Container>Loading...</Container>
      </div>
    );
  } else {
    const tabData = Object.keys(agenda).map((day: string) => {
      return {
        header: day,
        items: agenda[day],
      };
    });

    body = (
      <div className="App">
        <Container>
          <TabControl
            tabs={tabData}
            selectedTabIndex={selectedTabIndex}
            selectTab={setSelectedTabIndex}
          >
            {(header, items) => (
              <Day timeslots={items} day={header} key={header} />
            )}
          </TabControl>
        </Container>
      </div>
    );
  }

  return <Router>{body}</Router>;
};

export default App;
