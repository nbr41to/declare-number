import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Room } from 'types';

import { db } from './config';

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
    currentTurn: '',
    logs: [],
  };

  await setDoc(newRoomRef, initialRoomState);
  return newRoomRef.id;
};

/* 部屋のメンバー情報を追加 */
export const addMember = async (input: {
  roomId: string;
  id: string;
  name: string;
  code: string;
}): Promise<void> => {
  const { id, name, code } = input;
  const roomRef = query(
    collection(db, 'rooms'),
    where('inviteCode', '==', code),
  );
  const roomId = (await getDocs(roomRef)[0].id) as string;
  await updateDoc(doc(collection(db, 'rooms'), roomId), {
    [`members.${id}`]: {
      name,
      isReady: false,
      hands: [],
      point: 0,
      next: '',
    },
  });
};

/* ReadyCheckをtrueに書き換え */
export const onReady = async () => {};

/* room情報を書き換え */
export const writeRoom = async (room: Room): Promise<void> => {
  await setDoc(doc(collection(db, 'rooms'), room.id), room);
};

/* 初期ゲームデータの書き込み */
export const setGame = async () => {};

/* ドロー（Term1） */
export const termAction1 = async () => {};

/* 宣言（Term2） */
export const termAction2 = async () => {};
