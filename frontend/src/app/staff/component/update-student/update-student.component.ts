import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Class, ClassesService } from '../../../services/classes/classes.service';

@Component({
  selector: 'app-update-student',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit{
  student!: Student;
  error: string = '';
  id: string = '';
  classes: Class[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private classesService: ClassesService,
  ) {}

  ngOnInit(): void{
    this.getStudentById();
    this.getClasses();
  }

  getStudentById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.studentsService.getStudentById(this.id).subscribe({
      next: (res) => {
        this.student = res;
      },error: (err) => {
        console.log(err);
      }
    })
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

  updateStudent(): void {console.log(this.student)
    if(this.student.first_name === '' || this.student.last_name === '' || this.student.gender === '' 
      || this.student.birthday === '' || this.student.address === '' || this.classes === undefined
    ){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else {
      const cloneStudent = { ...this.student };
      if (cloneStudent.class && typeof cloneStudent.class === 'object') {
        (cloneStudent as any).class = cloneStudent.class._id;
      }

      this.studentsService.updateStudent(cloneStudent).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['staff', 'manage-students']);
        },
        error: (err) => {
          this.error = err.error.message;
        }
      })      
    }
  }
}
