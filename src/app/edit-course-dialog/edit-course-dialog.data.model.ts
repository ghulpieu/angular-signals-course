import { ICourse } from '../models/course.model';

export interface IEditCourseDialogData {
  mode: 'create' | 'update';
  title: string;
  course?: ICourse;
}
