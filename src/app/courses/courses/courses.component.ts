import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(course: Course) {
    this.coursesService.remove(course._id).subscribe(() => {
      this.refresh();
      this.snackBar.open('Curso removido com sucesso', 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    });
  }
}
