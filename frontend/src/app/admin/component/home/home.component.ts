import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor (private router: Router) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }

  goToSubjects(): void {
    this.router.navigate(['admin', 'subjects']);
  }

  goToCreateSubject(): void {
    this.router.navigate(['admin', 'subjects', 'create']);
  }

  goToUsers(): void {
    this.router.navigate(['admin', 'users']);
  }

  goToCreateUser(): void {
    this.router.navigate(['admin', 'users', 'create']);
  }

  goToStaffs(): void {
    this.router.navigate(['admin', 'staffs']);
  }

  goToCreateStaff(): void {
    this.router.navigate(['admin', 'staffs', 'create']);
  }

  goToTeachers(): void {
    this.router.navigate(['admin', 'teachers']);
  }

  goToCreateTeacher(): void {
    this.router.navigate(['admin', 'teachers', 'create']);
  }

  goToClasses(): void {
    this.router.navigate(['admin', 'classes']);
  }

  goToCreateClass(): void {
    this.router.navigate(['admin', 'classes', 'create']);
  }

  goToGrades(): void {
    this.router.navigate(['admin', 'grades']);
  }

  goToCreateGrade(): void {
    this.router.navigate(['admin', 'grades', 'create']);
  }

  goToScores(): void {
    this.router.navigate(['admin', 'scores']);
  }

  goToCreateScore(): void {
    this.router.navigate(['admin', 'scores', 'create']);
  }

  goToStudents(): void {
    this.router.navigate(['admin', 'students']);
  }

  goToCreateStudent(): void {
    this.router.navigate(['admin', 'students', 'create']);
  }

  goToSchoolYears(): void {
    this.router.navigate(['admin', 'school-years']);
  }

  goToCreateSchoolYear(): void {
    this.router.navigate(['admin', 'school-years', 'create']);
  }
}
