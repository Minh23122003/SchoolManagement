import { Component, OnInit } from '@angular/core';
import { Subject, SubjectsService } from '../../../../services/subjects/subjects.service';
import { Teacher, TeachersService } from '../../../../services/teachers/teachers.service';
import { Class, ClassesService } from '../../../../services/classes/classes.service';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { Schedule, SchedulesService } from '../../../../services/schedules/schedules.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  classes: Class[] = [];
  schoolYears: SchoolYear[] = [];
  schedule: Partial<Schedule> = {
    'weekday': 'Monday',
    'period': 1,
    'session': 'morning',
    'semester': 1
  };
  error: string = '';

  constructor (
    private router: Router,
    private teachersService: TeachersService,
    private subjectsService: SubjectsService,
    private schoolYearsService: SchoolYearsService,
    private classesService: ClassesService,
    private schedulesService: SchedulesService,
  ) {};

  ngOnInit(): void {
    this.getTeachers();
    this.getSchoolYears();
    this.getSubjects();
    this.getClasses();
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

  createSchedule(): void {
    if(this.schedule.subject === undefined || this.schedule.class === undefined ||
      this.schedule.teacher === undefined || this.schedule.school_year === undefined
    ) {
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else {
      this.schedulesService.postSchedule(this.schedule).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'schedules']);
        },
        error: (err) => {
          this.error = err.error.message;
        }
      })      
    }
  }
}