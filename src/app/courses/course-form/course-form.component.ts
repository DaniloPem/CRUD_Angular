import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  // NonNullableFormBuilder é para que nehum atributo do FormBuilder fosse nulo
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.coursesService.save(this.form.value).subscribe(
      (res) => this.onSucces(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSucces() {
    this.snackbar.open('Curso salvo com sucesso.', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackbar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
