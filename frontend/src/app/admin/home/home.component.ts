import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
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
}
