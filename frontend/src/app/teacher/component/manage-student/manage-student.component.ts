import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Schedule, SchedulesService } from '../../../services/schedules/schedules.service';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Class, ClassesService } from '../../../services/classes/classes.service';

@Component({
  selector: 'app-manage-student',
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.css'
})
export class ManageStudentComponent implements OnInit{
  userId: string = '';
  teacher !: Teacher;
  schedules: Schedule[] = [];
  students: Student[] = [];
  classes: Class[] = [];
  classSelected: string = '';

  constructor (
    private authService: AuthService,
    private schedulesService: SchedulesService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private classesService: ClassesService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getSchedules();
    this.getStudents();
    this.getClasses();
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

  getClassesByTeacher(): string[]{
    const classIds = [...new Set(
      this.schedules
        .filter(s => s.teacher._id === this.teacher._id)
        .map(s => s.class._id)
    )];
    console.log(classIds);return classIds
  }

  getClassById(id: string): Class{
    return this.classes.filter(c => c._id===id)[0];
  }

  getStudentsByClass(classId: string): Student[] {
    return this.students.filter(s => s.class._id===classId);
  }
}
