export interface Notification {
  msg_id: string;
  msg: string;
  time: string;
}

export interface SettingState {
  messageCount: number;
  messagePosition: number;
  messageDisappearTime: number;
}
