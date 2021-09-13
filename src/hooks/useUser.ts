import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getUser } from 'src/firebase/firestore';
import { userState } from 'src/recoil/atom';
import { User } from 'types';

const useUser = (): User => {
  const router = useRouter();
  const id = router.query?.id as string;
  const roomId = router.asPath.split('/')[1].split('?')[0];

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user?.id) return;
    getUser({ id, roomId }).then((res) => {
      setUser(res);
    });
  }, [router]);

  return user;
};

export { useUser };
