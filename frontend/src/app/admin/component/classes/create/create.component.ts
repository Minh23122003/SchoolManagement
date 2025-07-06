import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Teacher, TeachersService } from '../../../../services/teachers/teachers.service';
import { Grade, GradesService } from '../../../../services/grades/grades.service';
import { Class, ClassesService } from '../../../../services/classes/classes.service';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  grades: Grade[] = [];
  teachers: Teacher[] = [];
  class: Partial<Class> = {};
  error: string = '';

  constructor (
    private router: Router,
    private teachersService: TeachersService,
    private gradesService: GradesService,
    private classesService: ClassesService
  ) {};

  ngOnInit(): void {
    this.getGrades();
    this.getTeachers();
  }

  getGrades(): void {
    this.gradesService.getGrades().subscribe({
      next: (res) => {
        this.grades = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTeachers(): void {
    this.teachersService.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createClass(): void {
    if(this.class.name === undefined || this.class.name === '' ||
       this.class.grade === undefined || this.class.teacher === undefined){
      this.error = 'Vui lòng nhập tên lớp!';
    }else {
      this.classesService.postClass(this.class).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'classes']);
        },
        error: (err) => {
          this.error = err.error.message;
        }
      })      
    }
  }
}
