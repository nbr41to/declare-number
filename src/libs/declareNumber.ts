import { conversion } from 'src/libs/conversion';
import { Room } from 'types/index';

export const declareNumber = (input: {
  room: Room;
  number: number;
  targetId: string;
  declareId: string;
}): Room => {
  const { room, number, targetId, declareId } = input;
  const newRoom: Room = { ...room };
  const numOf = room.members[targetId].hands.filter(
    (hand) => hand === number,
  ).length;
  if (room.members[targetId].hands.includes(number)) {
    /* 宣言対象者が数字を持っていた場合 */
    newRoom.members[targetId].hands = room.members[targetId].hands.filter(
      (hand) => hand !== number,
    );
    for (let i = 0; i < numOf; i++) {
      newRoom.members[declareId].hands.push(number);
    }
  }
  newRoom.logs.push(
    `${number}！ ... ${room.members[targetId].name} ▶ ${room.members[declareId].name} __ ${numOf}枚`,
  );

  /* ターン移行処理 */
  newRoom.current.memberId = room.members[declareId].next;
  newRoom.current.phase = 'draw';
  return conversion(newRoom);
};
