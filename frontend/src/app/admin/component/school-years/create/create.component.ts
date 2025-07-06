import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  schoolYear: Partial<SchoolYear> = {
    'name': ''
  };
  error: string = ''

  constructor (private schoolYearsService: SchoolYearsService, private router: Router) {}
  
  ngOnInit(): void {
    
  }

  createSchoolYear(): void {
    if(this.schoolYear.name === '') {
      this.error = 'Vui lòng nhập đầy đủ thông tin!'
    } else {
      this.schoolYearsService.postSchoolYear(this.schoolYear).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'school-years']);
        }, error: (err) => {
          this.error = 'Tên năm học đã tồn tại!'
        }
      })
    }
  }
}
