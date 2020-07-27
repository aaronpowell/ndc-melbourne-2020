import React from "react";
import { Timeslot } from "../fetchAgenda";
import Talk from "./Talk";

const TimeslotComponent: React.FC<{ timeslot: Timeslot }> = ({ timeslot }) => {
  const sessions = timeslot.sessions;
  return (
    <li key={timeslot.startTime.hour}>
      <h3>
        {timeslot.startTime.hour}:{timeslot.startTime.minutes} -{" "}
        {timeslot.endTime.hour}:{timeslot.endTime.minutes}
      </h3>
      {sessions.map(({ title, speaker }) => (
        <Talk title={title} speaker={speaker} key={title} />
      ))}
    </li>
  );
};

export default TimeslotComponent;
