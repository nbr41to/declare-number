import { VFC } from 'react';
import styled from 'styled-components';

type ReadyCheckButtonProps = {
  className?: string;
  name: string;
  onClick: () => Promise<void>;
  done: boolean;
};

const ReadyCheckButton: VFC<ReadyCheckButtonProps> = ({
  className,
  name,
  onClick,
  done,
}) => {
  return (
    <StyledReadyCheckButton className={`${className}`}>
      {name}:
      <button disabled={done} onClick={onClick}>
        {done ? 'OK' : 'Ready?'}
      </button>
    </StyledReadyCheckButton>
  );
};

const StyledReadyCheckButton = styled.div``;

export { ReadyCheckButton };
