export type MessageSeverity = 'error' | 'warning' | 'info' | 'success';

export interface Message {
  severity: MessageSeverity;
  text: string;
}
