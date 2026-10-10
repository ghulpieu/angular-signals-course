import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { ILesson } from '../models/lesson.model';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@Component({
  selector: 'lessons',
  imports: [LessonDetailComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
  private lessonsService = inject(LessonsService);

  public mode = signal<'master' | 'detail'>('master');
  public lessons = signal<ILesson[]>([]);
  public selectedLesson = signal<ILesson | null>(null);
  public searchInput = viewChild.required<ElementRef>('search');

  public async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    console.log('search query:', query);

    const results = await this.lessonsService.loadLessons({ query });
    this.lessons.set(results);
  }

  public onLessonSelected(lesson: ILesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }

  public onLessonUpdated(lesson: ILesson) {
    this.lessons.update((lessons) =>
      lessons.map((l) => (l.id === lesson.id ? lesson : l)),
    );
  }

  public onCancel() {
    this.mode.set('master');
  }
}
