import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Staff, StaffsService } from '../../../../services/staffs/staffs.service';
import { User, UsersService } from '../../../../services/users/users.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  staff: Partial<Staff> = {

  };
  users: User[] = [];
  error: string = '';

  constructor (private staffsService: StaffsService, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    try {
      const adminUsers = await firstValueFrom(this.usersService.getUsersByRole('admin'));
      const staffUsers = await firstValueFrom(this.usersService.getUsersByRole('staff'));

      this.users = [...adminUsers, ...staffUsers];
    } catch (err) {
      console.error('Lỗi khi lấy users:', err);
    }
  }

  createStaff(): void {
    if(!this.staff.full_name || !this.staff.gender || !this.staff.address 
      || !this.staff.phone || !this.staff.email || !this.staff.user){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.staff.email.substring(this.staff.email.length - 10) !== '@gmail.com'){
      this.error = 'Email không hợp lệ!';
    }else{
      this.staff.phone = String(this.staff.phone);
      this.staffsService.postStaff(this.staff).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'staffs']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
