import { VFC } from 'react';
import { onReady, writeRoom } from 'src/firebase/firestore';
import { setGame } from 'src/libs/setGame';
import styled from 'styled-components';
import { Room } from 'types';

import { ReadyCheckButton } from './ReadyCheckButton';

type WaitingBoardProps = {
  className?: string;
  room: Room;
  userId: string;
};

const WaitingBoard: VFC<WaitingBoardProps> = ({ className, room, userId }) => {
  const { id: roomId, members } = room;
  const ready = async (memberId: string) => {
    await onReady({ memberId, roomId });
  };

  return (
    <StyledWaitingBoard className={`${className}`}>
      <h2>Member</h2>
      {Object.keys(members).map((memberId) => (
        <ReadyCheckButton
          key={memberId}
          name={members[memberId].name}
          done={members[memberId].isReady}
          onClick={() => ready(memberId)}
        />
      ))}
    </StyledWaitingBoard>
  );
};

const StyledWaitingBoard = styled.div``;

export { WaitingBoard };
