import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [HomeComponent, FormsModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  teachers: Teacher[] = [];
  info: string = ''

  constructor (private teachersService: TeachersService, private router: Router) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void{
    this.teachersService.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
      }, error: (err) => {
        alert(err);
      }
    })
  }

  goToCreateTeacher(): void{
    this.router.navigate(['admin', 'teachers', 'create']);
  }

  goToUpdateTeacher(id: string): void{
    this.router.navigate(['admin', 'teachers', id, 'update']);
  }

  deleteTeacher(id: string): void{
    if(confirm('Bạn chắc chắn xóa?')){
      this.teachersService.deleteTeacher(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getTeachers();
        }, error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
