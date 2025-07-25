import { Component, OnInit } from '@angular/core';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { Subject, SubjectsService } from '../../../services/subjects/subjects.service';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';

@Component({
  selector: 'app-manage-schedule',
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.css'
})
export class ManageScheduleComponent implements OnInit{
  classes: Class[] = [];
  schoolYears: SchoolYear[] = [];
  schedules: Schedule[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[]= [];
  classSelected: string = '';
  sessionSelected: string = '';
  semesterSelected: string = '';
  schoolYearSelected: string = '';
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  periods: number[] = [1, 2, 3, 4, 5];
  scheduleTable: { [day: string]: { [period: number]: { subject: string, teacher: string } } } = {};
  error: string = '';

  constructor (
    private classesService: ClassesService,
    private schoolYearsService: SchoolYearsService,
    private schedulesService: SchedulesService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
  ) {};

 ngOnInit(): void {
   this.getClasses();
   this.getSchoolYears();
   this.getSchedules();
   this.getSubjects();
   this.getTeachers();
   this.initScheduleTable();
 }

 initScheduleTable(): void {
  for(let day of this.days){
    this.scheduleTable[day] = {};
    for(let period of this.periods){
      this.scheduleTable[day][period] = {subject: '', teacher: ''};
    }
  }
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

  getScheduleByClass(): void {
    if(this.classSelected === ''){
      this.error = 'Vui lòng chọn lớp!';
    }else if(this.sessionSelected === ''){
      this.error = 'Vui lòng chọn buổi!';
    }else if(this.semesterSelected === ''){
      this.error = 'Vui lòng chọn học kỳ!';
    }else if(this.schoolYearSelected === ''){
      this.error = 'Vui lòng chọn năm học!'
    }else {
      for(let day of this.days){
        for(let period of this.periods){
          let scheduleSearch = this.schedules.filter(sche => sche.class._id===this.classSelected &&
              sche.session===this.sessionSelected && sche.semester===Number(this.semesterSelected) && 
              sche.school_year._id===this.schoolYearSelected && sche.period===period && sche.weekday===day
          );
          if(scheduleSearch.length === 0){
            this.scheduleTable[day][period].subject = 'No'
          }else{
            this.scheduleTable[day][period].subject = scheduleSearch[0].subject._id;
            this.scheduleTable[day][period].teacher = scheduleSearch[0].teacher._id;
          }
        }
      }
    }
  }

  changeDayToVietnamese(day: string): string{
    let dayInVietnamese = '';
      if(day === 'Monday'){
        dayInVietnamese = 'Thứ 2';
      }else if(day === 'Tuesday'){
        dayInVietnamese = 'Thứ 3';
      }else if(day === 'Wednesday'){
        dayInVietnamese = 'Thứ 4';
      }else if(day === 'Thursday'){
        dayInVietnamese = 'Thứ 5';
      }else if(day === 'Friday'){
        dayInVietnamese = 'Thứ 6';
      }else if(day === 'Saturday'){
        dayInVietnamese = 'Thứ 7';
      }
      return dayInVietnamese;
  }

  getSubjectById(id: string): Subject{
    return this.subjects.filter(sub => sub._id===id)[0];
  }

  getTeacherById(id: string): Teacher{
    return this.teachers.filter(teacher => teacher._id===id)[0];
  }
}
