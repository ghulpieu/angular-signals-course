import { Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICourse } from '../models/course.model';

Service();
export class CoursesServiceWithFetch {
  private env = environment;

  public async loadAllCourses(): Promise<ICourse[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);

    const payload = await response.json();

    return payload.courses;
  }

  public async createCourse(course: Partial<ICourse>): Promise<ICourse> {
    const response = await fetch(`${this.env.apiRoot}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    return response.json();
  }

  public async saveCourse(
    courseId: string,
    changes: Partial<ICourse>,
  ): Promise<ICourse> {
    const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'applicationjson',
      },
      body: JSON.stringify(changes),
    });
    return response.json();
  }

  public async deleteCourse(courseId: string): Promise<ICourse> {
    const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}
