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
    this.router.navigate(['teacher']);
  }

  goToManageStudent(): void {
    this.router.navigate(['teacher', 'manage-students']);
  }

  goToManageScore(): void {
    this.router.navigate(['teacher', 'manage-scores']);
  }

  goToManageSchedule(): void {
    this.router.navigate(['teacher', 'manage-schedules']);
  }

  goToCreateScore(): void {
    this.router.navigate(['teacher', 'manage-scores', 'create']);
  }

  goToUpdateScore(): void {
    this.router.navigate(['teacher', 'manage-scores', 'update']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
