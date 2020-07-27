import React from "react";
import styled from "styled-components";

type TalkProps = {
  title: string;
  speaker: string;
  room: string;
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

const Talk: React.FC<TalkProps> = ({ title, speaker, room }) => (
  <TalkContainer>
    <TalkTitle>{title}</TalkTitle>
    <Speaker>{speaker}</Speaker>
    <Room>{room}</Room>
  </TalkContainer>
);
export default Talk;
