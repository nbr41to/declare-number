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

export const setGame = (input: { room: Room; max: number }): Room => {
  const { room, max } = input;
  const newRoom = { ...room };
  const _deck = createCards(max);
  const deck = shuffle(_deck) as number[];
  const members = shuffle(Object.keys(newRoom.members)) as string[];
  members.forEach((memberId, index) => {
    newRoom.members[memberId].hands = deck.splice(0, 4);
    newRoom.members[memberId].point = 0;
    newRoom.members[memberId].next = members[(index + 1) % members.length];
  });
  newRoom.current = { memberId: members[0], phase: 'draw' };
  newRoom.deck = deck;
  return newRoom;
};
