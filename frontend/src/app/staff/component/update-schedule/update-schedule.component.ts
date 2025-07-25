import { Component, OnInit } from '@angular/core';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';
import { Subject, SubjectsService } from '../../../services/subjects/subjects.service';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-schedule',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-schedule.component.html',
  styleUrl: './update-schedule.component.css'
})
export class UpdateScheduleComponent implements OnInit{
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
  scheduleTable: { [day: string]: { [period: number]: { subject: string, teacher: string, id: string } } } = {};
  cloneScheduleTable: { [day: string]: { [period: number]: { subject: string, teacher: string } } } = {};
  cloneSchedule: { class: string, session: string, semester: string, schoolYear: string } = {
    class: '',
    session: '',
    semester: '',
    schoolYear: ''
  };

  error: string = '';
  
  constructor (
    private classesService: ClassesService,
    private schoolYearsService: SchoolYearsService,
    private schedulesService: SchedulesService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
    private router: Router,
  ) {};
  
  ngOnInit(): void {
   this.initScheduleTable();
   this.getClasses();
   this.getSchedules();
   this.getSchoolYears();
   this.getSubjects();
   this.getTeachers();
  }

  initScheduleTable(): void {
    for(let day of this.days){
      this.scheduleTable[day] = {};
      for(let period of this.periods){
        this.scheduleTable[day][period] = {subject: '', teacher: '', id: ''};
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
      this.error = 'Vui lòng chọn năm học!';
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
            this.scheduleTable[day][period].id = scheduleSearch[0]._id
          }
        }
      }
      this.cloneScheduleTable = structuredClone(this.scheduleTable);
      this.cloneSchedule.class = this.classSelected;
      this.cloneSchedule.session = this.sessionSelected;
      this.cloneSchedule.semester = this.semesterSelected;
      this.cloneSchedule.schoolYear = this.schoolYearSelected;
      }
  }

  updateSchedules(): void {
    if(this.scheduleTable['Monday'][1].subject === ''){
      this.error = 'Bạn chưa chọn lớp cần sửa!';
    }else{
      for(let day of this.days){
        for(let period of this.periods){
          if(this.cloneScheduleTable[day][period].subject === 'No' && this.scheduleTable[day][period].subject !== 'No'){
            if(this.scheduleTable[day][period].teacher === ''){
              this.error = `Vui lòng cho giáo viên cho tiết ${period} ngày ${this.changeDayToVietnamese(day)}`;
            }else{
              let schedule: Partial<Schedule> = {
                class: this.classes.filter(cls => cls._id === this.cloneSchedule.class)[0],
                session: this.cloneSchedule.session,
                semester: Number(this.cloneSchedule.semester),
                school_year: this.schoolYears.filter(sch => sch._id === this.cloneSchedule.schoolYear)[0],
                period: period,
                weekday: day,
                subject: this.subjects.filter(s => s._id === this.scheduleTable[day][period].subject)[0],
                teacher: this.teachers.filter(t => t._id === this.scheduleTable[day][period].teacher)[0]
              };
              if (schedule.class && typeof schedule.class === 'object') {
                (schedule as any).class = schedule.class._id;
              }
              if (schedule.subject && typeof schedule.subject === 'object') {
                (schedule as any).subject = schedule.subject._id;
              }
              if (schedule.teacher && typeof schedule.teacher === 'object') {
                (schedule as any).teacher = schedule.teacher._id;
              }
              if (schedule.school_year && typeof schedule.school_year === 'object') {
                (schedule as any).school_year = schedule.school_year._id;
              }
              this.schedulesService.postSchedule(schedule).subscribe({
                next: (res) => {
                  
                },
                error: (err) => {
                  console.log(err);
                }
              })
            }
          }else if(this.cloneScheduleTable[day][period].subject !== 'No' && this.scheduleTable[day][period].subject === 'No'){
            this.schedulesService.deleteSchedule(this.scheduleTable[day][period].id).subscribe({
              next: (res) => {
                if(day==='Saturday' && period===5){
                  alert('Tạo thành công');
                  this.router.navigate(['staff', 'manage-schedules']);
                }
              },
              error: (err) => {
                console.log(err);
              }
            })
          }else if(this.cloneScheduleTable[day][period].subject !== 'No' && this.scheduleTable[day][period].subject !== 'No' 
                && this.cloneScheduleTable[day][period].teacher !== this.scheduleTable[day][period].teacher){
            let schedule: Schedule = {
              _id: this.scheduleTable[day][period].id,
              class: this.classes.filter(cls => cls._id === this.cloneSchedule.class)[0],
              session: this.cloneSchedule.session,
              semester: Number(this.cloneSchedule.semester),
              school_year: this.schoolYears.filter(sch => sch._id === this.cloneSchedule.schoolYear)[0],
              period: period,
              weekday: day,
              subject: this.subjects.filter(s => s._id === this.scheduleTable[day][period].subject)[0],
              teacher: this.teachers.filter(t => t._id === this.scheduleTable[day][period].teacher)[0]
            };
            if (schedule.class && typeof schedule.class === 'object') {
              (schedule as any).class = schedule.class._id;
            }
            if (schedule.subject && typeof schedule.subject === 'object') {
              (schedule as any).subject = schedule.subject._id;
            }
            if (schedule.teacher && typeof schedule.teacher === 'object') {
              (schedule as any).teacher = schedule.teacher._id;
            }
            if (schedule.school_year && typeof schedule.school_year === 'object') {
              (schedule as any).school_year = schedule.school_year._id;
            }
            this.schedulesService.updateSchedule(schedule).subscribe({
              next: (res) => {
              },
              error: (err) => {
                console.log(err);
              }
            })
          }
        if(day==='Saturday' && period===5){
          alert('Cập nhật thành công');
          this.router.navigate(['staff', 'manage-schedules']);
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

  getTeacherBySubject(day: string, period: number): Teacher[]{
    if(this.scheduleTable[day][period].subject === ''){
      return this.teachers;
    }
    return this.teachers.filter(teacher => teacher.subject._id===this.scheduleTable[day][period].subject);
  }
}
