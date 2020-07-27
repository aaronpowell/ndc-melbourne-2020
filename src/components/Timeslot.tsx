import React from "react";
import { Timeslot } from "../fetchAgenda";
import Talk from "./Talk";
import { SectionHeader } from "./headers"

const TimeslotComponent: React.FC<{ timeslot: Timeslot }> = ({ timeslot }) => {
  const sessions = timeslot.sessions;
  return (
    <li>
      <SectionHeader>
        {timeslot.startTime.hour}:{timeslot.startTime.minutes} -{" "}
        {timeslot.endTime.hour}:{timeslot.endTime.minutes}
      </SectionHeader>
      {sessions.map(({ title, speaker }) => (
        <Talk title={title} speaker={speaker} key={title} />
      ))}
    </li>
  );
};

export default TimeslotComponent;
