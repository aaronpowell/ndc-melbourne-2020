import React from "react";
import "./App.css";
import { fetchAgenda, Agenda } from "./fetchAgenda";

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
          {Object.keys(agenda).map((day) => {
            const timeslots = agenda[day];
            return (
              <div key={day}>
                <h2>{day}</h2>
                <ul>
                  {timeslots.map((timeslot) => {
                    const sessions = timeslot.sessions;
                    return (
                      <li key={timeslot.startTime.hour}>
                        <h3>
                          {timeslot.startTime.hour}:{timeslot.startTime.minutes}{" "}
                          - {timeslot.endTime.hour}:{timeslot.endTime.minutes}
                        </h3>
                        {sessions.map((session) => {
                          return (
                            <p key={session.title}>
                              {session.title} - {session.speaker}
                            </p>
                          );
                        })}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </header>
      </div>
    );
  }
}

export default App;
