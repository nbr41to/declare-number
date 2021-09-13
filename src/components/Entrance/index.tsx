import { useRouter } from 'next/router';
import { useState, VFC } from 'react';
import { useRecoilState } from 'recoil';
import { createRoom, joinRoom } from 'src/firebase/firestore';
import { userState } from 'src/recoil/atom';
import styled from 'styled-components';

type EntranceProps = {
  className?: string;
};

const Entrance: VFC<EntranceProps> = ({ className }) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [inputCode, setInputCode] = useState('');
  console.log(user);
  const createRoomHandler = async () => {
    if (!user.id || !user.name) return;
    try {
      const roomId = await createRoom({ id: user.id, name: user.name });
      router.push({ pathname: `/${roomId}`, query: { id: user.id } });
    } catch (error) {
      console.error(error);
    }
  };
  const joinRoomHandler = async () => {
    if (!user.id || !user.name || inputCode.length !== 7) return;
    try {
      const roomId = await joinRoom({
        id: user.id,
        name: user.name,
        code: inputCode,
      });
      router.push({ pathname: `/${roomId}`, query: { id: user.id } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledEntrance className={`${className}`}>
      <label htmlFor="name">なまえ:</label>
      <input
        id="name"
        type="text"
        value={user.name}
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
      />
      <hr />
      <button onClick={createRoomHandler}>ルームを作成</button>
      <hr />
      <input
        type="text"
        placeholder="7桁のコードを入力"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button onClick={joinRoomHandler}>ルームに参加</button>
    </StyledEntrance>
  );
};

const StyledEntrance = styled.div``;

export { Entrance };
