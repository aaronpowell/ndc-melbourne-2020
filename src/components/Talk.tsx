import React, { useContext } from "react";
import styled from "styled-components";
import { Session } from "../fetchAgenda";
import { ScheduleContext } from "../ScheduleContextProvider";

type TalkProps = {
  session: Session;
};

const TalkContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-family: "Cascadia Code PL";
  min-height: 350px;
  position: relative;

  &:hover {
    background-color: #fff;
    color: #282c34;
    border-color: #282c34;
  }
`;

const TalkTitle = styled.p`
  font-size: 26px;
`;
const Speaker = styled.p`
  font-size: 20px;
`;
const Room = styled.p`
  font-size: 16px;
  position: absolute;
  bottom: 0;
`;
const ScheduleOption = styled.p`
  font-size: 16px;
  position: absolute;
  bottom: 0;
  right: 10px;
  cursor: pointer;
`;

const Talk: React.FC<TalkProps> = ({ session }) => {
  const {
    inSchedule,
    addToSchedule,
    removeFromSchedule,
    schedule,
  } = useContext(ScheduleContext);
  const { title, speaker, location } = session;
  const isInSchedule = inSchedule(schedule, session);

  return (
    <TalkContainer>
      <TalkTitle>{title}</TalkTitle>
      <Speaker>{speaker}</Speaker>
      <Room>{location}</Room>
      <ScheduleOption
        onClick={
          isInSchedule
            ? () => removeFromSchedule(session)
            : () => addToSchedule(session)
        }
      >
        {isInSchedule ? "Remove from schedule" : "Add to schedule"}
      </ScheduleOption>
    </TalkContainer>
  );
};
export default Talk;
