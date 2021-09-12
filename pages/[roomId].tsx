import { NextPage } from 'next';
import { GameBoard } from 'src/components/Room/GameBoard';

const RoomPage: NextPage = () => {
  return (
    <div>
      <h1>
        Authors
        <span>Lie</span>
      </h1>
      <GameBoard />
    </div>
  );
};

export default RoomPage;
