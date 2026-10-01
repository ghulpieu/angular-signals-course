import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICourse } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesServiceWithFetch {
  private env = environment;

  public async loadAllCourses(): Promise<ICourse[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);

    const payload = await response.json();

    return payload.courses;
  }
}
