import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ILesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';
import { inject } from '@angular/core';

export const courseLessonsResolver: ResolveFn<ILesson[]> = async (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
  const courseId = route.paramMap.get('courseId');
  if (!courseId) {
    return [];
  }

  const lessonsService = inject(LessonsService);
  return lessonsService.loadLessons({ courseId });
};
