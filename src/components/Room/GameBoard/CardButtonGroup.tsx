import { VFC } from 'react';
import styled from 'styled-components';

type CardButtonGroupProps = {
  className?: string;
  hands: number[];
  disabled: boolean;
  onClick: (number: number) => void;
};

const CardButtonGroup: VFC<CardButtonGroupProps> = ({
  className,
  hands,
  onClick,
  disabled,
}) => {
  return (
    <StyledCardButtonGroup className={`${className} box`}>
      {hands.sort().map((number, index) => (
        <button
          key={index}
          className="box"
          disabled={disabled}
          onClick={() => onClick(number)}
        >
          {number}
        </button>
      ))}
    </StyledCardButtonGroup>
  );
};

const StyledCardButtonGroup = styled.div``;

export { CardButtonGroup };
