import { VFC } from 'react';
import { useState } from 'react';
import { declareNumber } from 'src/libs/declareNumber';
import { setGame } from 'src/libs/setGame';
import styled from 'styled-components';
import { Room } from 'types';

import { CardButtonGroup } from './CardButtonGroup';
import { MemberPlate } from './MemberPlate';
import { PlayingLogs } from './PlayingLogs';

const user = {
  id: 'my-id',
  name: 'のぶゆき',
};
const initialRoomState: Room = {
  id: 'xxxxxx',
  inviteCode: 'xxxxxx',
  hostId: 'a',
  members: {
    [user.id]: {
      name: user.name,
      isReady: false,
      hands: [],
      point: 0,
      next: '',
    },
    'a-1': {
      name: 'nob',
      isReady: false,
      hands: [],
      point: 0,
      next: '',
    },
    'a-2': {
      name: 'sam',
      isReady: false,
      hands: [],
      point: 0,
      next: '',
    },
    'a-3': {
      name: 'john',
      isReady: false,
      hands: [],
      point: 0,
      next: '',
    },
  },
  deck: [],
  currentTurn: '',
  logs: [],
};

type GameBoardProps = {
  className?: string;
};

const GameBoard: VFC<GameBoardProps> = ({ className }) => {
  const [room, setRoom] = useState<Room>(initialRoomState);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const start = async () => {
    setRoom(setGame(initialRoomState));
  };
  const term = async (number: number) => {
    setRoom(
      declareNumber({
        room,
        number,
        targetId: selectedMemberId,
        declareId: room.currentTurn,
      }),
    );
  };
  const selectMember = (id: string) => {
    if (id === user.id) return;
    setSelectedMemberId(id);
  };
  console.log(room);
  return (
    <StyledGameBoard className={`${className}`}>
      <button onClick={start}>start</button>
      <PlayingLogs logs={room.logs} />
      {Object.keys(room?.members).map((memberId) => (
        <MemberPlate
          key={memberId}
          member={room?.members[memberId]}
          onClick={() => selectMember(memberId)}
          selected={selectedMemberId === memberId}
        />
      ))}
      <CardButtonGroup hands={room?.members[user.id].hands} onClick={term} />
    </StyledGameBoard>
  );
};

const StyledGameBoard = styled.div``;

export { GameBoard };
