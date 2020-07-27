import React, { createContext } from "react";
import { Agenda, useAgenda } from "./fetchAgenda";

const SessionListContext = createContext<{
  agenda?: Agenda;
  loaded: boolean;
}>({ agenda: undefined, loaded: false });

const SessionListContextProvider: React.FC = ({ children }) => {
  const { agenda, loaded } = useAgenda();

  return (
    <SessionListContext.Provider value={{ agenda, loaded }}>
      {children}
    </SessionListContext.Provider>
  );
};

export { SessionListContext, SessionListContextProvider };
