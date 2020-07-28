import React from "react";
import { Timeslot } from "../fetchAgenda";
import TimeslotComponent from "./Timeslot";

const Day: React.FC<{ timeslots: Timeslot[] }> = ({ timeslots }) => (
  <>
    {timeslots.map((timeslot) => (
      <TimeslotComponent timeslot={timeslot} key={timeslot.startTime.hour} />
    ))}
  </>
);

export default Day;
