import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [HomeComponent, FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  user!: User;
  error: string = '';
  id: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor (private usersService: UsersService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserById(this.id).subscribe({
      next: (res) => {
        this.user = res;
      }
    });
  }

  updateUser(): void {
    if(this.user.username === ''){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.password !== this.passwordConfirm){
      this.error = 'Mật khẩu và xác nhận mật khẩu không chính xác!'
    }else{
      if(this.password === ''){
        this.user.password = '';
      }else{
        this.user.password = this.password;
      }
      this.usersService.updateUser(this.user).subscribe({
        next: (res) => {
          alert('Thay đổi thành công!');
          this.router.navigate(['admin', 'users']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
