import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  goToHome(): void {
    this.router.navigate(['staff']);
  }

  goToManageStudent(): void {
    this.router.navigate(['staff', 'manage-students']);
  }

  goToCreateStudent(): void {
    this.router.navigate(['staff', 'manage-students', 'create']);
  }

  goToManageSchedule(): void {
    this.router.navigate(['staff', 'manage-schedules']);
  }

  goToCreateSchedule(): void {
    this.router.navigate(['staff', 'manage-schedules', 'create']);
  }

  goToUpdateSchedule(): void {
    this.router.navigate(['staff', 'manage-schedules', 'update']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
