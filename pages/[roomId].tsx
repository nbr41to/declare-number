import { NextPage } from 'next';
import { Room } from 'src/components/Room';

const RoomPage: NextPage = () => {
  return (
    <div>
      <h1>
        Authors
        <span>Lie</span>
      </h1>
      <Room />
    </div>
  );
};

export default RoomPage;
