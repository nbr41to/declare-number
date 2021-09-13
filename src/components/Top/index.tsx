import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useState, VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from 'src/recoil/atom';
import styled from 'styled-components';

type TopProps = {
  className?: string;
};

const Top: VFC<TopProps> = ({ className }) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const setUser = useSetRecoilState(userState);
  const start = () => {
    setUser((prev) => ({ ...prev, id: nanoid(), name: input }));
    router.push('/entrance');
  };
  return (
    <StyledTop className={`${className}`}>
      <p>名前を入力</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={start}>始める</button>
    </StyledTop>
  );
};

const StyledTop = styled.div``;

export { Top };
