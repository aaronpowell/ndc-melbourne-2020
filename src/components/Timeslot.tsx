import React from "react";
import { Timeslot } from "../fetchAgenda";
import Talk from "./Talk";
import { SectionHeader } from "./headers";
import styled from "styled-components";

const renderTime = ({ hour, minutes }: { hour: number; minutes: number }) =>
  `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-evenly;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const TimeslotComponent: React.FC<{ timeslot: Timeslot }> = ({ timeslot }) => {
  const sessions = timeslot.sessions;
  return (
    <li>
      <SectionHeader>
        {renderTime(timeslot.startTime)} - {renderTime(timeslot.endTime)}
      </SectionHeader>
      <Grid>
        {sessions.map(({ title, speaker, location }) => (
          <Talk title={title} speaker={speaker} key={title} room={location} />
        ))}
      </Grid>
    </li>
  );
};

export default TimeslotComponent;
