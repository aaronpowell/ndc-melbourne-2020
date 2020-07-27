import React from "react";
import "./App.css";
import { fetchAgenda, Agenda } from "./fetchAgenda";
import Day from "./components/Day";
import styled from "styled-components";

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

class App extends React.Component<{}, { agenda?: Agenda; loaded: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { agenda: undefined, loaded: false };
  }

  async componentWillMount() {
    const agenda = await fetchAgenda();

    this.setState({ agenda, loaded: true });
  }

  render() {
    const { agenda, loaded } = this.state;

    if (!agenda || !loaded) {
      return (
        <div className="App">
          <Container>Loading...</Container>
        </div>
      );
    }

    return (
      <div className="App">
        <Container>
          {Object.keys(agenda).map((day: string) => (
            <Day timeslots={agenda[day]} day={day} key={day} />
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
