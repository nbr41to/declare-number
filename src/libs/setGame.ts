import { Room } from '../../types/index';

const createCards = (max: number): number[] => {
  const cards: number[] = [];
  for (let i = 1; i < max + 1; i++) {
    cards.push(i);
    cards.push(i);
    cards.push(i);
    cards.push(i);
  }
  return cards;
};

const shuffle = (array: any[]) => {
  const newArray = array.slice();
  let currentIndex = newArray.length;
  let temporaryValue: string | number;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

export const setGame = (room: Room): Room => {
  const newRoom = { ...room };
  const _deck = createCards(9);
  const deck = shuffle(_deck);
  const members = shuffle(Object.keys(newRoom.members));
  members.forEach((memberId, index) => {
    newRoom.members[memberId].hands = deck.splice(0, 4);
    newRoom.members[memberId].next = members[(index + 1) % members.length];
  });
  newRoom.currentTurn = members[0];
  return newRoom;
};
