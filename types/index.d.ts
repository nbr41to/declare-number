export type User = {
  id: string;
  name: string;
  current: {
    roomId: string;
  };
};

export type Member = {
  name: string;
  isReady: boolean; // 準備完了フラグ
  hands: number[]; // 手札
  point: number; // 点数
  next: string; // 次のターンのユーザーID
};

export type Room = {
  id: string; // Room ID
  inviteCode: string; // 招待コード
  hostId: string; // ホストのユーザーID
  members: {
    [userId: string]: Member;
  };
  deck: number[]; // 山札
  currentTurn: string; // 現在のターンのユーザーID
  logs: string[]; // ログ
  // stamps: []; // スタンプ機能（実装予定）
};
