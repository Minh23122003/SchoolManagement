import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Score, ScoresService } from '../../../services/scores/scores.service';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-score',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-score.component.html',
  styleUrl: './create-score.component.css'
})
export class CreateScoreComponent implements OnInit{
  userId: string = '';
  teacher !: Teacher;
  schedules: Schedule[] = [];
  students: Student[] = [];
  classes: Class[] = [];
  scores: Score[] = [];
  schoolYears: SchoolYear[] = [];
  classSelected: string = '';
  semesterSelected: string = '';
  schoolYearSelected: string = '';
  typeSelected: string = '';
  studentsInput: Student[] = [];
  scoresInput: number[] = [];
  error: string = '';


  constructor (
    private authService: AuthService,
    private schedulesService: SchedulesService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private classesService: ClassesService,
    private schoolYearsService: SchoolYearsService,
    private scoresService: ScoresService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getSchedules();
    this.getStudents();
    this.getClasses();
    this.getSchoolYears();
  }

  getProfile(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.userId = res.sub;
        this.getInfo();
      }
    })
  }

  getInfo(): void {
    this.teachersService.getTeachers().subscribe({
      next: (res) => {
        this.teacher = res.filter(t => t.user._id===this.userId)[0];
      }
    })
  }

  createScores(): void {
    if(this.semesterSelected === ''){
      this.error = 'Vui lòng chọn học kỳ!';
    }else if(this.schoolYearSelected === ''){
      this.error = 'Vui lòng chọn năm học!';
    }else if(this.typeSelected === ''){
      this.error = 'Vui lòng chọn loại điểm!'
    }else{
      for(let i = 0; i < this.scoresInput.length; i++){
        if(this.scoresInput[i] > 10 || this.scoresInput[i] < 0){
          this.error = `Điểm học sinh ${this.studentsInput[i].first_name} ${this.studentsInput[i].last_name} không hợp lệ!`
          return;
        }
      }
      for(let i = 0; i < this.studentsInput.length; i++){
        let score : Partial<Score> = {
          type: this.typeSelected,
          semester: Number(this.semesterSelected),
          school_year: this.schoolYears.filter(s => s._id===this.schoolYearSelected)[0],
          score: this.scoresInput[i],
          subject: this.teacher.subject,
          student: this.studentsInput[i]
        }
        if (score.school_year && typeof score.school_year === 'object') {
          (score as any).school_year = score.school_year._id;
        }
        if (score.subject && typeof score.subject === 'object') {
          (score as any).subject = score.subject._id;
        }
        if (score.student && typeof score.student === 'object') {
          (score as any).student = score.student._id;
        }
        this.scoresService.postScore(score).subscribe({
          next: (res) => {
            if(i === this.studentsInput.length - 1){
              alert('Nhập điểm thành công!');
              this.router.navigate(['teacher', 'manage-scores']);
            }
          }, error: (err) => {
            this.error = 'Học sinh đã có điểm kiểm tra!'
            return;
          }
        });
      }
    }
  }

  getSchedules(): void {
    this.schedulesService.getSchedules().subscribe({
      next: (res) => {
        this.schedules = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  getClasses(): void {
    this.classesService.getClasses().subscribe({
      next: (res) => {
        this.classes = res;
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

  getClassesByTeacher(): string[]{
    const classIds = [...new Set(
      this.schedules
        .filter(s => s.teacher._id === this.teacher._id)
        .map(s => s.class._id)
    )];
    return classIds;
  }

  getClassById(id: string): Class{
    return this.classes.filter(c => c._id===id)[0];
  }

  getStudentsByClass(classId: string): Student[] {
    const filter = this.students.filter(s => s.class._id===classId);
    for(let i = 0; i < filter.length; i++){
      this.studentsInput[i] = filter[i];
      this.scoresInput[i] = 0;
    }
    return this.students.filter(s => s.class._id===classId);
  }
}
