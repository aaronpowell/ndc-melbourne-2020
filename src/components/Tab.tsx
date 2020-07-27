import React from "react";
import styled from "styled-components";
import { TitleHeader } from "./headers";
import { Timeslot } from "../fetchAgenda";
import { Link } from "react-router-dom";

export type TabControlProps = {
  tabs: {
    header: string;
    items: Timeslot[];
    path: string;
  }[];
  children: (day: string, timeslots: Timeslot[]) => React.ReactNode;
  selectedTabIndex: number;
  selectTab: (index: number) => void;
};

const TabContainer = styled.div``;
const TabHeaderContainer = styled.header`
  border-bottom: 1px solid #fff;
`;
const TabHeader = styled(TitleHeader)`
  display: inline-block;
  width: 300px;
  font-size: 30px;
  border: 1px solid #f0a;
  text-transform: uppercase;
  padding: 10px;
  border: 1px solid #fff;
  border-bottom: none;
  border-radius: 5px 5px 0px 0px;
  margin-right: 10px;
`;
const TabLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const TabBody = styled.div``;

const TabControl: React.FC<TabControlProps> = ({
  tabs,
  children,
  selectedTabIndex,
  selectTab,
}) => (
  <TabContainer>
    <TabHeaderContainer>
      {tabs.map(({ header, path }, i) => (
        <TabHeader key={header} onClick={() => selectTab(i)}>
          <TabLink to={path}>
            {selectedTabIndex === i ? "✔ " : ""}
            {header}
          </TabLink>
        </TabHeader>
      ))}
    </TabHeaderContainer>
    <TabBody>
      {typeof children === "function"
        ? children(tabs[selectedTabIndex].header, tabs[selectedTabIndex].items)
        : null}
    </TabBody>
  </TabContainer>
);

export default TabControl;
