import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, SubjectsService } from '../../../../services/subjects/subjects.service';
import { Student, StudentsService } from '../../../../services/students/students.service';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { Score, ScoresService } from '../../../../services/scores/scores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  subjects: Subject[] = [];
  students: Student[] = [];
  schoolYears: SchoolYear[] = [];
  score!: Score;
  error: string = '';
  id: string = '';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private schoolYearsService: SchoolYearsService,
    private scoresService: ScoresService,
  ) {};

  ngOnInit(): void {
    this.getScoreById();
    this.getStudents();
    this.getSchoolYears();
    this.getSubjects();
  }

  getScoreById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.scoresService.getScoreById(this.id).subscribe({
      next: (res) => {
        this.score = res;
      }
    });
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

  updateScore(): void {
    if(this.score.score === undefined || this.score.score === null || this.score.type === undefined || this.score.semester === undefined ||
      this.score.student === undefined || this.score.subject === undefined || this.score.school_year === undefined
    ){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.score.score < 0 || this.score.score > 10) {
      this.error = 'Điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 10!';
    }else {
      const cloneScore = { ...this.score }
      cloneScore.semester = Number(this.score.semester);
      if (cloneScore.subject && typeof cloneScore.subject === 'object') {
        (cloneScore as any).subject = cloneScore.subject._id;
      }
      if (cloneScore.student && typeof cloneScore.student === 'object') {
        (cloneScore as any).student = cloneScore.student._id;
      }
      if (cloneScore.school_year && typeof cloneScore.school_year === 'object') {
        (cloneScore as any).school_year = cloneScore.school_year._id;
      }
      this.scoresService.updateScore(cloneScore).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['admin', 'scores']);
        },
        error: (err) => {
          this.error = err.error.message;
        }
      })      
    }
  }
}
