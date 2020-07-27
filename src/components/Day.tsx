import React from "react";
import { Timeslot } from "../fetchAgenda";
import TimeslotComponent from "./Timeslot";

const Day: React.FC<{ timeslots: Timeslot[]; day: string }> = ({
  timeslots,
  day,
}) => (
  <div key={day}>
    <h2>{day}</h2>
    <ul>
      {timeslots.map((timeslot) => (
        <TimeslotComponent timeslot={timeslot} />
      ))}
    </ul>
  </div>
);

export default Day;
