import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICourse } from '../models/course.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IEditCourseDialogData } from '../edit-course-dialog/edit-course-dialog.data.model';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  private dialog = inject(MatDialog);
  public courses = input.required<ICourse[]>();
  public courseUpdated = output<ICourse>();
  public courseDeleted = output<string>();

  public async onEditCourse(course: ICourse) {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'update',
      title: 'Update Existing Course',
      course,
    });
    console.log('Course edited:', newCourse);
    this.courseUpdated.emit(newCourse);
  }

  public onCourseDeleted(course: ICourse) {
    this.courseDeleted.emit(course.id);
  }
}

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: IEditCourseDialogData,
) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();

  return firstValueFrom(close$);
}
