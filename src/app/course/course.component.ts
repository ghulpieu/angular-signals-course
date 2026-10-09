import { Component, inject, OnInit, signal } from '@angular/core';
import { ICourse } from '../models/course.model';
import { ILesson } from '../models/lesson.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public course = signal<ICourse | null>(null);
  public lessons = signal<ILesson[]>([]);

  public ngOnInit(): void {
    this.course.set(this.route.snapshot.data['course']);
    this.lessons.set(this.route.snapshot.data['lessons']);
  }
}
