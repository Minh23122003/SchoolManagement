import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../../../../services/users/users.service';
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
  user: Partial<User> = {
    'username': '',
    'role': 'staff',
    'password': ''
  };
  passwordConfirm: string = '';
  error: string = '';

  constructor (private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    
  }

  createUser(): void {
    if(this.user.username === '' || this.user.password === '' || this.passwordConfirm === ''){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.user.password !== this.passwordConfirm){
      this.error = 'Mật khẩu và xác nhận mật khẩu không chính xác!'
    }else{
      this.usersService.postUser(this.user).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'users']);
        }, error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
