import { Component, OnInit } from '@angular/core';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  schoolYears: SchoolYear[] = [];
  info: string = '';

  constructor (private schoolYearsService: SchoolYearsService, private router: Router) {}
  
  ngOnInit(): void {
    this.getSchoolYears();
  }

  goToCreateSchoolYear(): void {
    this.router.navigate(['admin', 'school-years', 'create']);
  }

  goToUpdateSchoolYear(id: string): void {
    this.router.navigate(['admin', 'school-years', id, 'update']);
  }

  deleteSchoolYear(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.schoolYearsService.deleteSchoolYear(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getSchoolYears();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
  }

  getSchoolYears(): void {
    this.schoolYearsService.getSchoolYears().subscribe({
      next: (res) => {
        this.schoolYears = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
