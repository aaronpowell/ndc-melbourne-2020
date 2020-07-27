import React from "react";

type TalkProps = {
  title: string;
  speaker: string;
};

const Talk: React.FC<TalkProps> = ({ title, speaker }) => (
  <p>
    {title} - {speaker}
  </p>
);
export default Talk;
