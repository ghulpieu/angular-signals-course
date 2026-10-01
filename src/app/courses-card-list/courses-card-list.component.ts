import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICourse } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  public courses = input.required<ICourse[]>();
}
