import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  id: string = '';
  schoolYear!: SchoolYear;
  error: string = '';

  constructor (private router: Router, private schoolYearsService: SchoolYearsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getSchoolYearById();
  }

  getSchoolYearById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.schoolYearsService.getSchoolYearById(this.id).subscribe({
      next: (res) => {
        this.schoolYear = res;
      }
    });
  }

  updateSchoolYear(): void{
    if(this.schoolYear.name === ''){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else {console.log(this.schoolYear);
      this.schoolYearsService.updateSchoolYear(this.schoolYear).subscribe({
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
