import { useEffect, VFC } from 'react';
import { useState } from 'react';
import { declareNumber } from 'src/libs/declareNumber';
import { draw } from 'src/libs/draw';
import styled from 'styled-components';
import { Room } from 'types';

import { writeRoom } from '../../../firebase/firestore';
import { CardButtonGroup } from './CardButtonGroup';
import { MemberPlate } from './MemberPlate';
import { PlayingLogs } from './PlayingLogs';

type GameBoardProps = {
  className?: string;
  room: Room;
  userId: string;
};

const GameBoard: VFC<GameBoardProps> = ({ className, room, userId }) => {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const term = room.current.memberId === userId ? room.current.phase : 'wait';

  useEffect(() => {
    if (term === 'declare') return;
    if (room.current.memberId !== userId) return;
  }, [room]);

  const termDraw = async () => {
    const changedRoom = draw({ room, userId });
    await writeRoom(changedRoom);
  };
  const termDeclare = async (number: number) => {
    if (!selectedMemberId) return;
    const changedRoom = declareNumber({
      room,
      number,
      targetId: selectedMemberId,
      declareId: room.current.memberId,
    });
    await writeRoom(changedRoom);
    setSelectedMemberId('');
  };
  const selectMember = (id: string) => {
    if (id === userId) return;
    setSelectedMemberId(id);
  };

  console.log(room);
  if (room)
    return (
      <StyledGameBoard className={`${className}`}>
        <PlayingLogs logs={room?.logs} />
        {Object.keys(room?.members).map((memberId) => (
          <MemberPlate
            key={memberId}
            member={room?.members[memberId]}
            onClick={() => selectMember(memberId)}
            selected={selectedMemberId === memberId}
          />
        ))}
        <CardButtonGroup
          disabled={term !== 'declare' || !selectedMemberId}
          hands={room?.members[userId].hands}
          onClick={termDeclare}
        />
        {term === 'draw' && <button onClick={termDraw}>draw</button>}
      </StyledGameBoard>
    );
  return <div>loading...</div>;
};

const StyledGameBoard = styled.div``;

export { GameBoard };
