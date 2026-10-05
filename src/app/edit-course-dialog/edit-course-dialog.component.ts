import { Component, effect, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ICourse } from '../models/course.model';
import { IEditCourseDialogData } from './edit-course-dialog.data.model';
import { CoursesService } from '../services/courses.service';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { CourseCategory } from '../models/course-category.model';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent {
  private dialogRef = inject(MatDialogRef);

  private data: IEditCourseDialogData = inject(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);
  private courseService = inject(CoursesService);
  private form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: [''],
  });

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      category: this.data?.course?.category,
      iconUrl: this.data?.course?.iconUrl,
    });
  }

  private async saveCourse(courseId: string, changes: Partial<ICourse>) {
    try {
      const updatedCourse = await this.courseService.saveCourse(
        courseId,
        changes,
      );
      this.dialogRef.close(updatedCourse);
    } catch (err) {
      console.error(err);
      alert('Failed to save the course');
    }
  }

  private async createCourse(course: Partial<ICourse>) {
    try {
      const newCourse = await this.courseService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (err) {
      console.error(err);
      alert(`Error creating the course.`);
    }
  }

  public async onSave() {
    const courseProps = this.form.value as Partial<ICourse>;
    if (this.data.mode === 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
    } else if (this.data.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  public onClose() {
    this.dialogRef.close();
  }
}
