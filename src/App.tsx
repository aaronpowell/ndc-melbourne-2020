import React from "react";
import "./App.css";
import { fetchAgenda, Agenda } from "./fetchAgenda";
import Day from "./components/Day";

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
          <header className="App-header">Loading...</header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          {Object.keys(agenda).map((day: string) => (
            <Day timeslots={agenda[day]} day={day} />
          ))}
        </header>
      </div>
    );
  }
}

export default App;
