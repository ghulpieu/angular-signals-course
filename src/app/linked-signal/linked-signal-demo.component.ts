import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'linked-signal-demo',
  templateUrl: './linked-signal-demo.component.html',
  styleUrl: './linked-signal-demo.component.scss',
})
export class LinkedSignalDemoComponent {
  private messagesService = inject(MessagesService);

  courses = [
    {
      code: 'BEGINNERS',
      title: 'Angular for Beginners',
      defaultQuantity: 10,
    },
    {
      code: 'SIGNALS',
      title: 'Angular Signals In Depth',
      defaultQuantity: 20,
    },
    {
      code: 'SSR',
      title: 'Angular SSR In Depth',
      defaultQuantity: 30,
    },
  ];

  selectedCourse = signal<string | null>('BEGINNERS');

  quantity = signal(1);

  constructor() {}

  onQuantityChanged(quantity: string) {
    this.quantity.set(parseInt(quantity));
  }

  public onArticleAdded() {
    this.messagesService.showMessage(
      `${this.quantity()} licenses added for ${this.selectedCourse()}`,
      'error',
    );
  }

  onCourseSelected(courseCode: string) {
    this.selectedCourse.set(courseCode);
  }
}
