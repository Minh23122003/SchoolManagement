import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';

@Component({
  selector: 'app-manage-schedule',
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.css'
})
export class ManageScheduleComponent implements OnInit{
  userId: string = '';
  teacher !: Teacher;
  semesterSelected: string = '';
  schoolYearSelected: string = '';
  schoolYears: SchoolYear[] = [];
  schedules: Schedule[] = [];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  periods: number[] = [1, 2, 3, 4, 5];
  scheduleMorning: { [day: string]: { [period: number]: { class: string } } } = {};
  scheduleAfternoon: { [day: string]: { [period: number]: { class: string } } } = {};
  error: string = '';

  constructor (
    private authService: AuthService,
    private teachersService: TeachersService,
    private schoolYearsService: SchoolYearsService,
    private schedulesService: SchedulesService,
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getSchoolYears();
    this.initScheduleTable();
    this.getSchedules();
  }

  initScheduleTable(): void {
    for(let day of this.days){
      this.scheduleMorning[day] = {};
      this.scheduleAfternoon[day] = {};
      for(let period of this.periods){
        this.scheduleMorning[day][period] = {class: ''};
        this.scheduleAfternoon[day][period] = {class: ''};
      }
    }
  }

  getSchedulesByTeacher(): void {
    if(this.semesterSelected === ''){
      this.error = 'Vui lòng chọn học kỳ!'
    }else if(this.schoolYearSelected === ''){
      this.error = 'Vui lòng chọn năm học!';
    } else {
      for(let day of this.days){
        for(let period of this.periods){
          let scheduleSearchMorning = this.schedules.filter(s => s.teacher._id===this.teacher._id &&
              s.session==='morning' && s.semester===Number(this.semesterSelected) && s.subject._id===this.teacher.subject._id &&
              s.school_year._id===this.schoolYearSelected && s.period===period && s.weekday===day
          );
          if(scheduleSearchMorning.length === 0){
            this.scheduleMorning[day][period].class = 'No';
          }else{
            this.scheduleMorning[day][period].class = scheduleSearchMorning[0].class.name;
          }

          let scheduleSearchAfternoon = this.schedules.filter(s => s.teacher._id===this.teacher._id &&
              s.session==='afternoon' && s.semester===Number(this.semesterSelected) && 
              s.school_year._id===this.schoolYearSelected && s.period===period && s.weekday===day
          );
          if(scheduleSearchAfternoon.length === 0){
            this.scheduleAfternoon[day][period].class = 'No';
          }else{
            this.scheduleAfternoon[day][period].class = scheduleSearchAfternoon[0].class.name;
          }
        }
      }
    }
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
}
