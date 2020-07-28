import React, { createContext, useState } from "react";
import { Agenda, Session } from "./fetchAgenda";
import { shallowCompare } from "./shallowCompare";

export type ScheduleContextProps = {
  schedule: Agenda;
  inSchedule: (schedule: Agenda, session: Session) => boolean;
  addToSchedule: (session: Session) => void;
  removeFromSchedule: (session: Session) => void;
};

const ScheduleContext = createContext<ScheduleContextProps>({
  schedule: {},
  inSchedule: (schedule: Agenda, session: Session) => false,
  addToSchedule: (session: Session) => {},
  removeFromSchedule: (session: Session) => {},
});

const inScheduleImpl = (schedule: Agenda, session: Session) => {
  const day = schedule[session.day];

  if (!day) {
    return false;
  }

  const timeSlot = day.find(
    (ts) =>
      shallowCompare(ts.startTime, session.startTime) &&
      shallowCompare(ts.endTime, session.endTime)
  );

  if (timeSlot) {
    return (
      timeSlot.sessions.find((s) => s.title === session.title) !== undefined
    );
  }
  return false;
};

const addToScheduleImpl = (schedule: Agenda) => (session: Session) => {
  if (inScheduleImpl(schedule, session)) {
    return schedule;
  }

  if (!schedule[session.day]) {
    schedule[session.day] = [];
  }

  let timeSlot = schedule[session.day].find((ts) => {
    return (
      shallowCompare(ts.startTime, session.startTime) &&
      shallowCompare(ts.endTime, session.endTime)
    );
  });

  if (!timeSlot) {
    timeSlot = {
      startTime: session.startTime,
      endTime: session.endTime,
      sessions: [],
    };
    schedule[session.day].push(timeSlot);
  }

  timeSlot.sessions.push(session);

  return schedule;
};

const removeFromScheduleImpl = (schedule: Agenda) => (session: Session) => {
  const day = schedule[session.day];
  if (!inScheduleImpl(schedule, session) || !day) {
    return schedule;
  }

  let timeSlot = day.find((ts) => {
    return (
      shallowCompare(ts.startTime, session.startTime) &&
      shallowCompare(ts.endTime, session.endTime)
    );
  });

  if (!timeSlot) {
    return schedule;
  }

  const index = timeSlot.sessions.indexOf(session);
  timeSlot.sessions = timeSlot.sessions
    .slice(0, index)
    .concat(timeSlot.sessions.slice(index + 1));

  return schedule;
};

const ScheduleContextProvider: React.FC = ({ children }) => {
  const [schedule, setSchedule] = useState<Agenda>({});

  const addToSchedule = addToScheduleImpl(schedule);
  const inSchedule = inScheduleImpl;
  const removeFromSchedule = removeFromScheduleImpl(schedule);

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        inSchedule,
        addToSchedule: (session) => {
          const schedule = addToSchedule(session);
          setSchedule(schedule);
        },
        removeFromSchedule: (session) => {
          const schedule = removeFromSchedule(session);
          setSchedule(schedule);
        },
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export { ScheduleContext, ScheduleContextProvider };
