import { CourseCategory } from './course-category.model';

export interface ICourse {
  id: string;
  title: string;
  longDescription: string;
  seqNo: number;
  iconUrl: string;
  price: number;
  uploadedImageUrl: string;
  courseListIcon: string;
  category: CourseCategory;
  lessonsCount: number;
}

export function sortCoursesBySeqNo(c1: ICourse, c2: ICourse) {
  return c1.seqNo - c2.seqNo;
}
