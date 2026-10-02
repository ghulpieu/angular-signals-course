import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ICourse } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Service()
export class CoursesService {
  private http = inject(HttpClient);
  private env = environment;

  public async loadAllCourses(): Promise<ICourse[]> {
    const courses$ = this.http.get<GetCoursesResponse>(
      `${this.env.apiRoot}/courses`,
    );

    const response = await firstValueFrom(courses$);

    return response.courses;
  }

  public async createCourse(course: Partial<ICourse>): Promise<ICourse> {
    const course$ = this.http.post<ICourse>(
      `${this.env.apiRoot}/courses`,
      course,
    );
    return firstValueFrom(course$);
  }

  public async saveCourse(
    courseId: string,
    changes: Partial<ICourse>,
  ): Promise<ICourse> {
    const course$ = this.http.put<ICourse>(
      `${this.env.apiRoot}/courses/${courseId}`,
      changes,
    );
    return firstValueFrom(course$);
  }

  public async deleteCourse(courseId: string): Promise<ICourse> {
    const course$ = this.http.delete<ICourse>(
      `${this.env.apiRoot}/courses/${courseId}`,
    );
    return firstValueFrom(course$);
  }
}
