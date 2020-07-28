import { useState, useEffect } from "react";

export type Session = {
  title: string;
  speaker: string;
  location: string;
  link: string;
  tags: string[];
  day: string;
  startTime: {
    hour: number;
    minutes: number;
  };
  endTime: {
    hour: number;
    minutes: number;
  };
};

export type Timeslot = {
  startTime: {
    hour: number;
    minutes: number;
  };
  endTime: {
    hour: number;
    minutes: number;
  };
  sessions: Session[];
};

export type Agenda = {
  [key: string]: Timeslot[];
};

function shallowCompare(left: any, right: any) {
  if (left === right) {
    return true;
  }

  const leftKeys = Object.keys(left);

  for (let lk of leftKeys) {
    if (left[lk] !== right[lk]) {
      return false;
    }
  }

  return true;
}

const fetchAgenda = async () => {
  const res = await fetch("/agenda.json");
  const agenda: Session[] = await res.json();
  let days: Agenda = {};

  for (let i = 0; i < agenda.length; i++) {
    const session: Session = agenda[i];

    if (!days[session.day]) {
      days[session.day] = [];
    }

    let timeslot = days[session.day].find((ts) => {
      return (
        shallowCompare(ts.startTime, session.startTime) &&
        shallowCompare(ts.endTime, session.endTime)
      );
    });

    if (!timeslot) {
      timeslot = {
        startTime: session.startTime,
        endTime: session.endTime,
        sessions: [],
      };
      days[session.day].push(timeslot);
    }

    timeslot.sessions.push(session);
  }

  return days;
};

const useAgenda = () => {
  const [agenda, setAgenda] = useState<Agenda>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = async () => {
      const agenda = await fetchAgenda();
      setAgenda(agenda);
      setLoaded(true);
    };

    loader();
  }, []);

  return { agenda, loaded };
};

export { useAgenda };
