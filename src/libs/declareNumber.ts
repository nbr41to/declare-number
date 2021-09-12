import { Room } from 'types/index';

export const declareNumber = (input: {
  room: Room;
  number: number;
  targetId: string;
  declareId: string;
}): Room => {
  const { room, number, targetId, declareId } = input;
  if (!room.members[targetId].hands.includes(number)) return room;
  const newRoom: Room = { ...room };
  const numOf = room.members[targetId].hands.filter(
    (hand) => hand === number,
  ).length;
  newRoom.members[targetId].hands = room.members[targetId].hands.filter(
    (hand) => hand !== number,
  );
  for (let i = 0; i < numOf; i++) {
    newRoom.members[declareId].hands.push(number);
  }
  newRoom.logs.push(
    `${number}: ${room.members[targetId].name}▶${room.members[declareId].name} ${numOf}枚`,
  );
  newRoom.currentTurn = room.members[declareId].next;
  return newRoom;
};
