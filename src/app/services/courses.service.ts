import { inject, Injectable, Service } from '@angular/core';
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
}
