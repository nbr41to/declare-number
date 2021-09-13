import { Room } from 'types';

import { conversion } from './conversion';

export const draw = (input: { room: Room; userId: string }): Room => {
  const { room, userId } = input;
  const newRoom = { ...room };
  const drawCard = newRoom.deck.splice(0, 1);
  console.log(drawCard);
  newRoom.members[userId].hands.push(drawCard[0]);
  newRoom.current.phase = 'declare';
  console.log(newRoom);
  return conversion(newRoom);
};
