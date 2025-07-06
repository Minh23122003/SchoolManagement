import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Grade, GradesService } from '../../../../services/grades/grades.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  id: string = '';
  grade!: Grade;
  error: string = '';

  constructor (private router: Router, private gradesService: GradesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getGradeById();
  }

  getGradeById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.gradesService.getGradeById(this.id).subscribe({
      next: (res) => {
        this.grade = res;
      }
    });
  }

  updateGrade(): void{
    if(this.grade.name === ''){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else {console.log(this.grade);
      this.gradesService.updateGrade(this.grade).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['admin', 'grades']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
