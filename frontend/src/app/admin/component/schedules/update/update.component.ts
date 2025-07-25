import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Schedule, SchedulesService } from '../../../../services/schedules/schedules.service';
import { SchoolYear, SchoolYearsService } from '../../../../services/school-years/school-years.service';
import { Class, ClassesService } from '../../../../services/classes/classes.service';
import { Teacher, TeachersService } from '../../../../services/teachers/teachers.service';
import { Subject, SubjectsService } from '../../../../services/subjects/subjects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  classes: Class[] = [];
  schoolYears: SchoolYear[] = [];
  schedule!: Schedule;
  error: string = '';
  id: string = '';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private subjectsService: SubjectsService,
    private schoolYearsService: SchoolYearsService,
    private classesService: ClassesService,
    private schedulesService: SchedulesService,
  ) {};

  ngOnInit(): void {
    this.getScoreById();
    this.getTeachers();
    this.getSchoolYears();
    this.getSubjects();
    this.getClasses();
  }

  getScoreById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.schedulesService.getScheduleById(this.id).subscribe({
      next: (res) => {
        this.schedule = res;
      }
    });
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

  updateSchedule(): void {
    const cloneSchedule = { ...this.schedule }
    if (cloneSchedule.subject && typeof cloneSchedule.subject === 'object') {
      (cloneSchedule as any).subject = cloneSchedule.subject._id;
    }
    if (cloneSchedule.class && typeof cloneSchedule.class === 'object') {
      (cloneSchedule as any).class = cloneSchedule.class._id;
    }
    if (cloneSchedule.teacher && typeof cloneSchedule.teacher === 'object') {
      (cloneSchedule as any).teacher = cloneSchedule.teacher._id;
    }
    if (cloneSchedule.school_year && typeof cloneSchedule.school_year === 'object') {
      (cloneSchedule as any).school_year = cloneSchedule.school_year._id;
    }
    cloneSchedule.semester = Number(cloneSchedule.semester);
    this.schedulesService.updateSchedule(cloneSchedule).subscribe({
      next: (res) => {
        alert('Cập nhật thành công!');
        this.router.navigate(['admin', 'schedules']);
      },
      error: (err) => {
        this.error = err.error.message;
      }
    })      
  }
}
