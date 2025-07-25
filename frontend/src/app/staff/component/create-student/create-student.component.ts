import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent implements OnInit{
  classes: Class[] = [];
  student: Partial<Student> = {
    'first_name': '',
    'last_name': '',
    'birthday': '',
    'address': '',
    'gender': ''
  };
  error: string = '';

  constructor (
    private router: Router,
    private classesService: ClassesService,
    private studentsService: StudentsService,
  ) {};

  ngOnInit(): void {
    this.getClasses();
  }


  getClasses(): void {
    this.classesService.getClasses().subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createStudent(): void {
    if(this.student.first_name === '' || this.student.last_name === '' || this.student.gender === '' 
      || this.student.birthday === '' || this.student.address === '' || this.classes === undefined
    ){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else {
      this.studentsService.postStudent(this.student).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['staff', 'manage-students']);
        },
        error: (err) => {
          this.error = err.error.message;
        }
      })      
    }
  }
}
