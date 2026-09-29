import { Course } from '../models/course.model';

export interface EditCourseDialogData {
  mode: 'create' | 'update';
  title: string;
  course?: Course;
}
