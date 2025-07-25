import { Component, OnInit } from '@angular/core';
import { Class, ClassesService } from '../../../services/classes/classes.service';
import { Grade, GradesService } from '../../../services/grades/grades.service';
import { CommonModule } from '@angular/common';
import { Student, StudentsService } from '../../../services/students/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-student',
  imports: [CommonModule],
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.css'
})
export class ManageStudentComponent implements OnInit{
  classes: Class[] = [];
  grades: Grade[] = [];
  students: Student[] = [];
  classId: string = '';

  constructor(
    private classesService: ClassesService,
    private gradesService: GradesService,
    private studentsService: StudentsService,
    private router: Router,
  ) {};

  ngOnInit(): void {
    this.getGrades();
    this.getClasses();
    this.getStudents();
  }

  getClasses(): void {
    this.classesService.getClasses().subscribe({
      next: (res) => {
        this.classes = res;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getGrades(): void {
    this.gradesService.getGrades().subscribe({
      next: (res) => {
        this.grades = res;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getClassesByGrade(gradeId: string): Class[] {
    return this.classes.filter(cls => cls.grade._id === gradeId);
  }

  getStudentsByClass(id: string): Student[] {
    if(id === '')
      return this.students;
  
    return this.students.filter(stu => stu.class._id === id);
  }

  setClassId(id: string): void {
    this.classId = id;
  }

  goToUpdateStudent(id: string): void {
    this.router.navigate(['staff', 'manage-students', id, 'update']);
  }

  goToCreateStudent(): void {
    this.router.navigate(['staff', 'manage-students', 'create']);
  }
}
