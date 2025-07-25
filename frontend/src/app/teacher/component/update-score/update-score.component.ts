import { Component, OnInit } from '@angular/core';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { Score, ScoresService } from '../../../services/scores/scores.service';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-score',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-score.component.html',
  styleUrl: './update-score.component.css'
})
export class UpdateScoreComponent implements OnInit{
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
  scoresInput: Score[] = [];
  cloneScoresInput: Score[] = [];
  error: string = '';
  info = {semester: '', schoolYear: '', type: '', class: ''};


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
    this.getScores();
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

  updateScores(): void {
    for(let i = 0; i < this.scoresInput.length; i++){
      if(this.scoresInput[i].score > 10 || this.scoresInput[i].score < 0){
        this.error = `Điểm học sinh ${this.studentsInput[i].first_name} ${this.studentsInput[i].last_name} không hợp lệ!`
        return;
      }
    }
    for(let i = 0; i < this.studentsInput.length; i++){
      if(this.scoresInput[i].score !== this.cloneScoresInput[i].score){
        if (this.scoresInput[i].school_year && typeof this.scoresInput[i].school_year === 'object') {
          (this.scoresInput[i] as any).school_year = this.scoresInput[i].school_year._id;
        }
        if (this.scoresInput[i].subject && typeof this.scoresInput[i].subject === 'object') {
          (this.scoresInput[i] as any).subject = this.scoresInput[i].subject._id;
        }
        if (this.scoresInput[i].student && typeof this.scoresInput[i].student === 'object') {
          (this.scoresInput[i] as any).student = this.scoresInput[i].student._id;
        }
        console.log(this.scoresInput[i])
        this.scoresService.updateScore(this.scoresInput[i]).subscribe({
          next: (res) => {
          }, error: (err) => {
            console.log(err);
          }
        });
      }
      if(i === this.studentsInput.length - 1){
        alert('Cập nhật điểm thành công!');
        this.router.navigate(['teacher', 'manage-scores']);
      }
    }
  }

  getStudentsByClass(classId: string): Student[] {
    this.scoresInput = [];
    this.studentsInput = [];
    const filter = this.students.filter(s => s.class._id===classId);
    for(let i = 0; i < filter.length; i++){
      this.studentsInput[i] = filter[i];
      const scores = this.scores.filter(s => s.semester===Number(this.semesterSelected) && s.school_year._id===this.schoolYearSelected
                && s.student._id===filter[i]._id && s.subject._id===this.teacher.subject._id);
      let score: Score = {
        _id: '',
        score: -1,
        student: filter[i],
        type:'',
        subject: this.teacher.subject,
        semester: Number(this.semesterSelected),
        school_year: this.schoolYears.filter(s => s._id===this.schoolYearSelected)[0]
      }
      this.scoresInput[i] = score;
      if(this.typeSelected==='45m'){
        const result = scores.filter(s => s.type==='45m')
        if(result.length !== 0){
          this.scoresInput[i] = result[0];
        }
      }else if(this.typeSelected==='final'){
        const result = scores.filter(s => s.type==='final')
        if(result.length !== 0){
          this.scoresInput[i] = result[0];
        }
      }else{
        const result = scores.filter(s => s.type==='15m')
        if(this.typeSelected==='15m-1' && result.length > 0){
          this.scoresInput[i] = result[0];
        }else if(this.typeSelected==='15m-2' && result.length > 1){
          this.scoresInput[i] = result[1];
        }else if(this.typeSelected==='15m-3' && result.length > 2){
          this.scoresInput[i] = result[2];
        }
      }
    }
    this.info.class = this.classSelected;
    this.info.semester = this.semesterSelected;
    this.info.schoolYear = this.schoolYearSelected;
    this.info.type = this.typeSelected;
    this.cloneScoresInput = structuredClone(this.scoresInput);
    return this.students.filter(s => s.class._id===classId);
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

  getScores(): void {
    this.scoresService.getScores().subscribe({
      next: (res) => {
        this.scores = res;
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
}
