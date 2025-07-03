import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UsersService } from '../../../services/users/users.service';
import { Staff, StaffsService } from '../../../services/staffs/staffs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [HomeComponent, FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  users: User[] = [];
  staff!: Staff;
  error: string = '';
  id: string = '';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private staffsService: StaffsService
  ) {}

  ngOnInit(): void{
    this.getUsers();
    this.getStaffById();
  }

  getStaffById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.staffsService.getStaffById(this.id).subscribe({
      next: (res) => {
        this.staff = res;
      },error: (err) => {
        console.log(err);
      }
    })
  }

  getUsers(): void {
    this.usersService.getUsersByRole('admin').subscribe({
      next: (res) => {
        this.users = res;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.usersService.getUsersByRole('staff').subscribe({
      next: (res) => {
        this.users = [...this.users, ...res];
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  updateStaff(): void {
    if(!this.staff.full_name || !this.staff.gender || !this.staff.address 
      || !this.staff.phone || !this.staff.email){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.staff.email.substring(this.staff.email.length - 10) !== '@gmail.com'){
      this.error = 'Email không hợp lệ!';
    }else{
      this.staff.phone = String(this.staff.phone);
      if (this.staff.user && typeof this.staff.user === 'object') {
        (this.staff as any).user = this.staff.user._id;
      }
      this.staffsService.updateStaff(this.staff).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['admin', 'staffs']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
