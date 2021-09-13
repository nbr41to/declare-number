import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { stringify } from 'querystring';
import { Room, User } from 'types';

import { db } from './config';

const roomRef = collection(db, 'rooms');
const roomDoc = (roomId: string) => doc(db, 'rooms', roomId);

/* 新しい部屋の作成 */
export const createRoom = async (input: {
  id: string;
  name: string;
}): Promise<string> => {
  const { id, name } = input;

  const newRoomRef = doc(collection(db, 'rooms'));
  const inviteCode = ('0000000' + Math.floor(Math.random() * 10000000))
    .slice(-7)
    .toString();
  const initialRoomState: Room = {
    id: newRoomRef.id,
    inviteCode,
    hostId: id,
    members: {
      [id]: {
        name,
        isReady: false,
        hands: [],
        point: 0,
        next: '',
      },
    },
    deck: [],
    current: { memberId: '', phase: 'draw' },
    logs: [],
  };

  await setDoc(newRoomRef, initialRoomState);
  return newRoomRef.id;
};

/* 部屋に入る*/
export const joinRoom = async (input: {
  id: string;
  name: string;
  code: string;
}): Promise<string> => {
  const { id, name, code } = input;
  const roomRef = query(
    collection(db, 'rooms'),
    where('inviteCode', '==', code),
  );
  const snapshot = await getDocs(roomRef);
  const roomId = snapshot.docs[0].id;
  await updateDoc(doc(collection(db, 'rooms'), roomId), {
    [`members.${id}`]: {
      name,
      isReady: false,
      hands: [],
      point: 0,
      next: '',
    },
  });
  return roomId;
};

/* ReadyCheckをtrueに書き換え */
export const onReady = async (input: {
  memberId: string;
  roomId: string;
}): Promise<void> => {
  const { memberId, roomId } = input;
  await updateDoc(doc(collection(db, 'rooms'), roomId), {
    [`members.${memberId}.isReady`]: true,
  });
};

/* room情報を書き換え */
export const writeRoom = async (room: Room): Promise<void> => {
  await setDoc(doc(db, 'rooms', room.id), room);
};

/* user情報の取得 */
export const getUser = async (input: {
  id: string;
  roomId: string;
}): Promise<User> => {
  const { id, roomId } = input;
  if (!id || !roomId) return;
  const roomDoc = await getDoc(doc(db, 'rooms', roomId));
  const room = roomDoc.data() as Room;
  console.log(room);
  const user = {
    id,
    name: room.members[id].name,
    current: { roomId },
  };
  return user;
};

/* 初期ゲームデータの書き込み */
export const setGame = async () => {};

/* ドロー（Term1） */
export const termAction1 = async () => {};

/* 宣言（Term2） */
export const termAction2 = async () => {};
