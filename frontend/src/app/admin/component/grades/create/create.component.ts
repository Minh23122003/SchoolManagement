import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Grade, GradesService } from '../../../../services/grades/grades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  grade: Partial<Grade> = {
    'name': ''
  };
  error: string = ''

  constructor (private gradesService: GradesService, private router: Router) {}
  
  ngOnInit(): void {
    
  }

  createGrade(): void {
    if(this.grade.name === '') {
      this.error = 'Vui lòng nhập đầy đủ thông tin!'
    } else {
      this.gradesService.postGrade(this.grade).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'grades']);
        }, error: (err) => {
          this.error = 'Tên khối học đã tồn tại!'
        }
      })
    }
  }
}
