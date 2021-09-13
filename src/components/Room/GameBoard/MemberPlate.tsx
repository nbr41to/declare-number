import { VFC } from 'react';
import styled from 'styled-components';
import { Member } from 'types';

type MemberPlateProps = {
  className?: string;
  member: Member;
  onClick: () => void;
  selected: boolean;
};

const MemberPlate: VFC<MemberPlateProps> = ({
  className,
  member,
  onClick,
  selected,
}) => {
  return (
    <StyledMemberPlate
      className={`${className} box`}
      onClick={onClick}
      selected={selected}
    >
      <span>{member.point}|</span>
      <span>{member.name}|</span>
      <span>
        {member.hands.map((_, member) => (
          <span key={member}> ■ </span>
        ))}
      </span>
    </StyledMemberPlate>
  );
};

const StyledMemberPlate = styled.div<{ selected: boolean }>`
  ${({ selected }) => selected && 'background-color: limegreen'};
  cursor: pointer;
`;

export { MemberPlate };
