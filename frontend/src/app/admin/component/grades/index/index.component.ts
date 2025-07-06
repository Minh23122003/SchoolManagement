import { Component, OnInit } from '@angular/core';
import { Grade, GradesService } from '../../../../services/grades/grades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  grades: Grade[] = [];
  info: string = '';

  constructor (private gradesService: GradesService, private router: Router) {}
  
  ngOnInit(): void {
    this.getGrades();
  }

  goToCreateGrade(): void {
    this.router.navigate(['admin', 'grades', 'create']);
  }

  goToUpdateGrade(id: string): void {
    this.router.navigate(['admin', 'grades', id, 'update']);
  }

  deleteGrade(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.gradesService.deleteGrade(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getGrades();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
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
}
