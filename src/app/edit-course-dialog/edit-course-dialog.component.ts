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
import { MessagesService } from '../messages/messages.service';

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
  private messagesService = inject(MessagesService);
  private dialogRef = inject(MatDialogRef);

  private data: IEditCourseDialogData = inject(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);
  private courseService = inject(CoursesService);
  private form = this.fb.group({
    title: [''],
    longDescription: [''],
    iconUrl: [''],
  });

  public category = signal<CourseCategory>('BEGINNER');

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      iconUrl: this.data?.course?.iconUrl,
    });
    this.category.set(this.data?.course!.category);
    effect(() => {
      console.log(`Course category bi-directional binding: ${this.category()}`);
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
      this.messagesService.showMessage(`Failed to save the course.`, 'error');
      console.error(err);
    }
  }

  private async createCourse(course: Partial<ICourse>) {
    try {
      const newCourse = await this.courseService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (err) {
      this.messagesService.showMessage(`Error creating the course.`, 'error');
      console.error(err);
    }
  }

  public async onSave() {
    const courseProps = this.form.value as Partial<ICourse>;
    courseProps.category = this.category();
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
