import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ICourse, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  CoursesCardListComponent,
  openEditCourseDialog,
} from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
//import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private coursesService = inject(CoursesService);
  private dialog = inject(MatDialog);
  private loadingService = inject(LoadingService);

  #courses = signal<ICourse[]>([]);

  public beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'BEGINNER');
  });

  public advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'ADVANCED');
  });

  constructor() {
    effect(() => {
      console.log('Beginner:', this.beginnerCourses());
      console.log('Advanced:', this.advancedCourses());
    });

    void this.loadCourses().then(() =>
      console.log('All courses loaded:', this.#courses()),
    );
  }

  public async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (err) {
      alert(`Error loading courses!`);
      console.error(err);
    }
  }

  public async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'Create New Course',
    });

    const newCourses = [...this.#courses(), newCourse];

    this.#courses.set(newCourses);
  }

  public onCourseUpdated(updatedCourse: ICourse) {
    const courses = this.#courses();
    const newCourses = courses.map((course) =>
      course.id === updatedCourse?.id ? updatedCourse : course,
    );
    this.#courses.set(newCourses);
  }

  public async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);

      const courses = this.#courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (err) {
      console.error(err);
      alert(`Error deleting course.`);
    }
  }
}
