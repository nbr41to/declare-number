import { VFC } from 'react';
import styled from 'styled-components';

type PlayingLogsProps = {
  className?: string;
  logs: string[];
};

const PlayingLogs: VFC<PlayingLogsProps> = ({ className, logs }) => {
  return (
    <StyledPlayingLogs className={`${className} box`}>
      {logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </StyledPlayingLogs>
  );
};

const StyledPlayingLogs = styled.div``;

export { PlayingLogs };
