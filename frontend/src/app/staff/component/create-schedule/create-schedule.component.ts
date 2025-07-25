import { Component, OnInit } from '@angular/core';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { SchoolYear, SchoolYearsService } from '../../../services/school-years/school-years.service';
import { Subject, SubjectsService } from '../../../services/subjects/subjects.service';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-schedule',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent implements OnInit{
  classes: Class[] = [];
  schoolYears: SchoolYear[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  schedules: Schedule[] = [];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  periods: number[] = [1, 2, 3, 4, 5];
  scheduleTable: { [day: string]: { [period: number]: { subject: string, teacher: string } } } = {};

  classSelected: string = '';
  sessionSelected: string = '';
  semesterSelected: string = '';
  schoolYearSelected: string = '';
  error: string = '';

  constructor (
    private classesService: ClassesService,
    private schoolYearsService: SchoolYearsService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
    private schedulesService: SchedulesService,
    private router: Router,
  ) {};

  ngOnInit(): void {
    this.getClasses();
    this.getSchoolYears();
    this.getSubjects();
    this.getTeachers();
    this.getSchedules();

    for (let day of this.days) {
      this.scheduleTable[day] = {};
      for (let period of this.periods) {
        this.scheduleTable[day][period] = {subject: '', teacher: ''};
      }
    }
  }

  createSchedules(): void {
    if(this.classSelected === ''){
      this.error = 'Vui lòng chọn lớp!';
    }else if(this.sessionSelected === ''){
      this.error = 'Vui lòng chọn buổi!';
    }else if(this.semesterSelected === ''){
      this.error = 'Vui lòng chọn học kỳ!';
    }else if(this.schoolYearSelected === ''){
      this.error = 'Vui lòng chọn năm học!';
    }else{
      let schedule = this.schedules.filter(sche =>{return sche.class._id===this.classSelected && sche.session===this.sessionSelected &&
                    sche.semester===Number(this.semesterSelected ) && sche.school_year._id===this.schoolYearSelected});
      
      if(schedule.length !== 0){
        this.error = 'Lớp đã có thời khóa biểu!';
      }else{
        for (let day of this.days) {
        for (let period of this.periods) {
          if(this.scheduleTable[day][period].subject === ''){        
            this.error = `Bạn chưa chọn môn học cho tiết ${period} ngày ${this.changeDayToVietnamese(day)}`;
            return;
          }else{
            if(this.scheduleTable[day][period].subject !== 'No' && this.scheduleTable[day][period].teacher === ''){
              this.error = `Bạn chưa chọn giáo viên cho tiết ${period} ngày ${this.changeDayToVietnamese(day)}`;
              return;
            }

            const schedulesSearch = this.schedules.filter(sche => {
              return sche.class._id===this.classSelected && sche.session===this.sessionSelected &&
                    sche.semester===Number(this.semesterSelected ) && sche.school_year._id===this.schoolYearSelected &&
                    sche.weekday===day && sche.subject._id===this.scheduleTable[day][period].subject &&
                    sche.period===period && sche.teacher._id===this.scheduleTable[day][period].teacher
            })
            if(schedulesSearch.length !== 0){
              this.error = `Giáo viên đã có lịch dạy vào tiết ${period} ngày ${this.changeDayToVietnamese(day)} ở lớp khác`
              return;
            }
          }
        }

        for(let day of this.days){
          for(let period of this.periods){
            if(this.scheduleTable[day][period].subject !== 'No'){
              const schedule:Partial<Schedule> = {
                weekday: day,
                period:period,
                semester: Number(this.semesterSelected),
                session: this.sessionSelected,
                class: this.classes.filter(cls => cls._id===this.classSelected)[0],
                subject: this.subjects.filter(sub => sub._id===this.scheduleTable[day][period].subject)[0],
                teacher: this.teachers.filter(teacher => teacher._id===this.scheduleTable[day][period].teacher)[0],
                school_year: this.schoolYears.filter(sch => sch._id===this.schoolYearSelected)[0]
              }

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
                  if(day==='Saturday' && period===5){
                    alert('Tạo thành công');
                    this.router.navigate(['staff', 'manage-schedules']);
                  }
                }, error: (err) => {
                  console.log(err);
                  return;
                }
              })
            }
          }
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

  getTeacherBySubject(day: string, period: number): Teacher[]{
    if(this.scheduleTable[day][period].subject === ''){
      return this.teachers;
    }
    return this.teachers.filter(teacher => teacher.subject._id===this.scheduleTable[day][period].subject);
  }
}
