import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher, TeachersService } from '../../../../services/teachers/teachers.service';
import { Grade, GradesService } from '../../../../services/grades/grades.service';
import { Class, ClassesService } from '../../../../services/classes/classes.service';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  class!: Class;
  error: string = '';
  id: string = '';
  grades: Grade[] = [];
  teachers: Teacher[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private gradesService: GradesService,
    private classesService: ClassesService,
  ) {}

  ngOnInit(): void{
    this.getClassById();
    this.getGrades();
    this.getTeachers();
  }

  getClassById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.classesService.getClassById(this.id).subscribe({
      next: (res) => {
        this.class = res;
      },error: (err) => {
        console.log(err);
      }
    })
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

  getTeachers(): void {
    this.teachersService.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  updateClass(): void {console.log(this.class)
    if(this.class.name === ''){
      this.error = 'Vui lòng nhập đầy đủ thông tin'
    }else{
      const cloneClass = { ...this.class };
      if (cloneClass.grade && typeof cloneClass.grade === 'object') {
        (cloneClass as any).grade = cloneClass.grade._id;
      }
      if (cloneClass.teacher && typeof cloneClass.teacher === 'object') {
        (cloneClass as any).teacher = cloneClass.teacher._id;
      }
      this.classesService.updateClass(cloneClass).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['admin', 'classes']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
