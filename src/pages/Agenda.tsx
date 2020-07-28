import React, { useContext, useState, useEffect } from "react";
import TabControl from "../components/Tab";
import Day from "../components/Day";
import { SessionListContext } from "../SessionListContextProvider";
import { useParams, useHistory } from "react-router-dom";

const Agenda = () => {
  const { agenda, loaded } = useContext(SessionListContext);
  const { day } = useParams<{ day?: string }>();
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    // no day in the route, bail out early
    if (!day) {
      return;
    }

    // only try if the agenda is loaded
    if (agenda) {
      const keys = Object.keys(agenda);
      const agendaDay = keys.find((k) => k === day);

      // if the day is found, update the selected index
      if (agendaDay) {
        setSelectedTabIndex(keys.indexOf(day));
      } else {
        // it wasn't a valid day, go back to default
        history.push("/agenda");
      }
    }
  }, [agenda, day, history]);

  if (!agenda || !loaded) {
    return <p>Loading...</p>;
  }

  const tabData = Object.keys(agenda).map((day: string) => {
    return {
      header: day,
      items: agenda[day],
      path: `/agenda/${day}`,
    };
  });

  return (
    <TabControl
      tabs={tabData}
      selectedTabIndex={selectedTabIndex}
      selectTab={setSelectedTabIndex}
    >
      {(header, items) => <Day timeslots={items} key={header} />}
    </TabControl>
  );
};

export default Agenda;
