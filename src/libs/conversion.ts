import { Room } from '../../types/index';

/* handsから揃っているカードの数字があればそれを返す */
const checkCollecting = (hands: number[]): number | null => {
  const handsNumbers = Array.from(new Set(hands));
  const collectNumber = handsNumbers.find((number) => {
    const matchCards = hands.filter((card) => card === number);
    return matchCards.length > 3;
  });
  return collectNumber || null;
};

/* 全員のhandsに揃っているカードがないかチェックし,そのカードを削除したRoom情報を返す */
export const conversion = (room: Room): Room => {
  const newRoom = { ...room };
  Object.keys(newRoom.members).forEach((memberId) => {
    const collectNumber = checkCollecting(newRoom.members[memberId].hands);
    if (!collectNumber) return;
    newRoom.members[memberId].hands = newRoom.members[memberId].hands.filter(
      (card) => card !== collectNumber,
    );
  });
  return newRoom;
};
