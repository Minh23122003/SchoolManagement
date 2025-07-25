import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { Score, ScoresService } from '../../../services/scores/scores.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';

@Component({
  selector: 'app-manage-score',
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-score.component.html',
  styleUrl: './manage-score.component.css'
})
export class ManageScoreComponent implements OnInit{
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
  scoresStudent: {'student': Student ,'15m-1': number, '15m-2': number, '15m-3': number, '45m': number, 'final': number}[] = [];

  constructor (
    private authService: AuthService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private classesService: ClassesService,
    private schoolYearsService: SchoolYearsService,
    private scoresService: ScoresService,
    private schedulesService: SchedulesService,
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

  getScoresByClass(): void {
    const filterStudent = this.students.filter(s => s.class._id===this.classSelected);
    this.scoresStudent = [];
    for(let i = 0; i < filterStudent.length; i++){
      const scores = this.scores.filter(s => s.student._id===filterStudent[i]._id && s.subject._id===this.teacher.subject._id 
                  && s.semester===Number(this.semesterSelected) && s.school_year._id===this.schoolYearSelected);

      const scoreEntry = {
        student: filterStudent[i],
        '15m-1': -1,
        '15m-2': -1,
        '15m-3': -1,
        '45m': -1,
        final: -1
      };
      if(scores.filter(s=> s.type==='45m').length !== 0){
        scoreEntry['45m'] = scores.filter(s=> s.type==='45m')[0].score;
      }

      if(scores.filter(s=> s.type==='final').length !== 0){
        scoreEntry['final'] = scores.filter(s=> s.type==='final')[0].score;
      }

      const scores15m = scores.filter(s=> s.type==='15m')
      if(scores15m.length === 1){
        scoreEntry['15m-1'] = scores15m[0].score;
      }else if(scores15m.length === 2){
        scoreEntry['15m-1'] = scores15m[0].score;
        scoreEntry['15m-2'] = scores15m[1].score;
      }else if(scores15m.length === 3){
        scoreEntry['15m-1'] = scores15m[0].score;
        scoreEntry['15m-2'] = scores15m[1].score;
        scoreEntry['15m-3'] = scores15m[2].score;
      }
      this.scoresStudent.push(scoreEntry);
    }
    console.log(this.scoresStudent)
  }
}
