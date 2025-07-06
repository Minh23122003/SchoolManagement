import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Score, ScoresService } from '../../../../services/scores/scores.service';
import { Subject, SubjectsService } from '../../../../services/subjects/subjects.service';
import { Student, StudentsService } from '../../../../services/students/students.service';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  subjects: Subject[] = [];
  students: Student[] = [];
  schoolYears: SchoolYear[] = [];
  score: Partial<Score> = {};
  error: string = '';

  constructor (
    private router: Router,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private schoolYearsService: SchoolYearsService,
    private scoresService: ScoresService,
  ) {};

  ngOnInit(): void {
    this.getStudents();
    this.getSchoolYears();
    this.getSubjects();
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

  getSubjects(): void {
    this.subjectsService.getSubjects().subscribe({
      next: (res) => {
        this.subjects = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  createScore(): void {
    if(this.score.score === undefined || this.score.score === null || this.score.type === undefined || this.score.semester === undefined ||
      this.score.student === undefined || this.score.subject === undefined || this.score.school_year === undefined
    ){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.score.score < 0 || this.score.score > 10) {
      this.error = 'Điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 10!';
    }else {
      this.score.semester = Number(this.score.semester);
      this.scoresService.postScore(this.score).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'scores']);
        },
        error: (err) => {
          this.error = err.error.message;
        }
      })      
    }
  }
}
