import { Service, signal } from '@angular/core';
import { IMessage, MessageSeverity } from '../models/message.model';

@Service()
export class MessagesService {
  #messageSignal = signal<IMessage | null>(null);

  public message = this.#messageSignal.asReadonly();

  public showMessage(text: string, severity: MessageSeverity) {
    this.#messageSignal.set({ text, severity });
  }

  public clear() {
    this.#messageSignal.set(null);
  }
}
