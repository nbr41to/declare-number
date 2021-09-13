import { useState, VFC } from 'react';
import { writeRoom } from 'src/firebase/firestore';
import { useRoom } from 'src/hooks/useRoom';
import { useUser } from 'src/hooks/useUser';
import { setGame } from 'src/libs/setGame';
import styled from 'styled-components';

import { GameBoard } from './GameBoard';
import { WaitingBoard } from './WaitingBoard';

type RoomProps = {
  className?: string;
};

const Room: VFC<RoomProps> = ({ className }) => {
  const user = useUser();
  const room = useRoom();
  console.log(user);
  console.log(room);
  const [maxNumber, setMaxNumber] = useState(5);

  const onGame =
    Object.keys(room?.members || []).length ===
    Object.keys(room?.members || []).filter(
      (menubarId) => room?.members[menubarId].isReady,
    ).length;

  const start = async () => {
    const changedRoom = setGame({ room, max: maxNumber });
    await writeRoom(changedRoom);
  };

  if (room)
    return (
      <StyledRoom className={`${className}`}>
        <h3>部屋コード:{room?.inviteCode}</h3>
        {room.hostId === user.id && (
          <div>
            <button onClick={() => setMaxNumber(maxNumber + 1)}>+</button>
            <button onClick={() => setMaxNumber(maxNumber - 1)}>-</button>
            <p>最大数字:{maxNumber}</p>
            <button onClick={start}>ゲーム開始</button>
          </div>
        )}
        {/* {onGame && !room.current.memberId && room.hostId === user.id && (
        )} */}
        {onGame ? (
          <GameBoard room={room} userId={user.id} />
        ) : (
          <WaitingBoard room={room} userId={user.id} />
        )}
      </StyledRoom>
    );
  return <div>...loading</div>;
};

const StyledRoom = styled.div``;

export { Room };
