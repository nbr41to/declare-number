import { Room } from 'types';

import { conversion } from './conversion';

export const draw = (input: { room: Room; current: string }): Room => {
  const { room, current } = input;
  const newRoom = { ...room };
  const drawCard = newRoom.deck.splice(0, 1);
  newRoom.members[current].hands.push(drawCard[0]);
  return conversion(newRoom);
};
