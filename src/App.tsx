import React from "react";
import "./App.css";
import { fetchAgenda, Agenda } from "./fetchAgenda";
import Day from "./components/Day";
import styled from "styled-components";
import TabControl from "./components/Tab";

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

class App extends React.Component<
  {},
  { agenda?: Agenda; loaded: boolean; selectedTabIndex: number }
> {
  constructor(props: {}) {
    super(props);
    this.state = { agenda: undefined, loaded: false, selectedTabIndex: 0 };
  }

  async componentWillMount() {
    const agenda = await fetchAgenda();
    this.setState({ agenda, loaded: true });
  }

  selectTab = (index: number) => {
    this.setState({
      selectedTabIndex: index,
    });
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

    const tabData = Object.keys(agenda).map((day: string) => {
      return {
        header: day,
        items: agenda[day],
      };
    });

    return (
      <div className="App">
        <Container>
          <TabControl
            tabs={tabData}
            selectedTabIndex={this.state.selectedTabIndex}
            selectTab={this.selectTab}
          >
            {(header, items) => (
              <Day timeslots={items} day={header} key={header} />
            )}
          </TabControl>
        </Container>
      </div>
    );
  }
}

export default App;
