import { Component, inject, input, output } from '@angular/core';
import { ILesson } from '../../models/lesson.model';
import { ReactiveFormsModule } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'lesson-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
  private lessonsService = inject(LessonsService);
  private messagesService = inject(MessagesService);

  public lesson = input.required<ILesson | null>();
  public lessonUpdated = output<ILesson>();
  public cancelUpdate = output();

  public async onSave(description: string) {
    try {
      const lesson = this.lesson();

      const updatedLesson = await this.lessonsService.saveLesson(lesson!.id, {
        description,
      });
      this.lessonUpdated.emit(updatedLesson);
    } catch (err) {
      console.error(err);
      this.messagesService.showMessage(`Error saving lesson!`, 'error');
    }
  }

  public onCancel() {
    this.cancelUpdate.emit();
  }
}
