import { VFC } from 'react';
import styled from 'styled-components';

type CardButtonGroupProps = {
  className?: string;
  hands: number[];
  onClick: (number: number) => void;
};

const CardButtonGroup: VFC<CardButtonGroupProps> = ({
  className,
  hands,
  onClick,
}) => {
  return (
    <StyledCardButtonGroup className={`${className} box`}>
      {hands.map((number, index) => (
        <button key={index} className="box" onClick={() => onClick(number)}>
          {number}
        </button>
      ))}
    </StyledCardButtonGroup>
  );
};

const StyledCardButtonGroup = styled.div``;

export { CardButtonGroup };
