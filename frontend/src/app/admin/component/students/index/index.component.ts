import { Component, OnInit } from '@angular/core';
import { Student, StudentsService } from '../../../../services/students/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  students: Student[] = [];
  info: string = '';

  constructor (private studentsService: StudentsService, private router: Router) {}
  
  ngOnInit(): void {
    this.getStudents();
  }

  goToCreateStudent(): void {
    this.router.navigate(['admin', 'students', 'create']);
  }

  goToUpdateStudent(id: string): void {
    this.router.navigate(['admin', 'students', id, 'update']);
  }

  deleteStudent(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.studentsService.deleteStudent(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getStudents();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
