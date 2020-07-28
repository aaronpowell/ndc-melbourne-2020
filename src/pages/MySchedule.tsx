import React, { useContext, useState, useEffect } from "react";
import { SessionListContext } from "../SessionListContextProvider";
import { ScheduleContext } from "../ScheduleContextProvider";
import TabControl from "../components/Tab";
import Day from "../components/Day";
import { useParams, useHistory } from "react-router-dom";

const MySchedule = () => {
  const { loaded } = useContext(SessionListContext);
  const { schedule } = useContext(ScheduleContext);
  const { day } = useParams<{ day?: string }>();
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    // no day in the route, bail out early
    if (!day) {
      return;
    }

    // only try if the agenda is loaded
    if (schedule) {
      const keys = Object.keys(schedule);
      const scheduleDay = keys.find((k) => k === day);

      // if the day is found, update the selected index
      if (scheduleDay) {
        setSelectedTabIndex(keys.indexOf(day));
      } else {
        // it wasn't a valid day, go back to default
        history.push("/schedule");
      }
    }
  }, [schedule, day, history]);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  const tabData = Object.keys(schedule).map((day: string) => {
    return {
      header: day,
      items: schedule[day],
      path: `/schedule/${day}`,
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

export default MySchedule;
