import { Service, signal } from '@angular/core';

@Service()
export class LoadingService {
  #loadingSignal = signal<boolean>(false);

  public loading = this.#loadingSignal.asReadonly();

  public loadingOn() {
    this.#loadingSignal.set(true);
  }

  public loadingOff() {
    this.#loadingSignal.set(false);
  }
}
