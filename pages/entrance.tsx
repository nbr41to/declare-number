import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { createRoom } from 'src/firebase/firestore';

const EntrancePage: NextPage = () => {
  const router = useRouter();
  const createRoomHandler = async () => {
    const roomId = await createRoom({ id: 'abc12345', name: 'nob' });
    router.push(`/${roomId}`);
  };

  return (
    <div>
      <h1>entrance</h1>
      <h2>部屋を立てる</h2>
      <button onClick={createRoomHandler}>create</button>
      <h2>部屋を探す</h2>
    </div>
  );
};

export default EntrancePage;
