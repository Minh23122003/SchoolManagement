import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";
  error: string = "";

  constructor (private authService: AuthService, private router: Router) {};

  ngOnInit(): void {
    
  }

  login(): void {
    if(this.username == "" || this.password == ""){
      this.error = "Vui lòng nhập đầy đủ thông tin!"
    }else{
      this.authService.login(this.username, this.password).subscribe({
        next: (res) => {
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("role", res.role);
          console.log("thanh cong")
          if(res.role === 'admin') {
            this.router.navigate(['admin']);
          }
        },
        error: (err) => {
          this.error = "Tên đăng nhập hoặc mật khẩu không chính xác!"
        }
      })
    }
  }
}
