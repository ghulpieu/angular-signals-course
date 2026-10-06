export type MessageSeverity = 'error' | 'warning' | 'info' | 'success';

export interface IMessage {
  severity: MessageSeverity;
  text: string;
}
