import { VFC } from 'react';
import styled from 'styled-components';

type PlayingLogsProps = {
  className?: string;
  logs: string[];
};

const PlayingLogs: VFC<PlayingLogsProps> = ({ className, logs }) => {
  return (
    <StyledPlayingLogs className={`${className} box`}>
      <p>{logs[logs.length - 1] || ' - '}</p>
      <p>{logs[logs.length - 2] || ' - '}</p>
      <p>{logs[logs.length - 3] || ' - '}</p>
    </StyledPlayingLogs>
  );
};

const StyledPlayingLogs = styled.div``;

export { PlayingLogs };
