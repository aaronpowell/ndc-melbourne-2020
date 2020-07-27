import React from "react";
import { Timeslot } from "../fetchAgenda";
import TimeslotComponent from "./Timeslot";

const Day: React.FC<{ timeslots: Timeslot[]; day: string }> = ({
  timeslots,
  day,
}) => (
  <div>
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {timeslots.map((timeslot) => (
        <TimeslotComponent timeslot={timeslot} key={timeslot.startTime.hour} />
      ))}
    </ul>
  </div>
);

export default Day;