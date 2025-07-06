import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../../../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  users: User[] = [];
  info: string = '';

  constructor (private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers()
  }

  goToCreateUser(): void {
    this.router.navigate(['admin', 'users', 'create']);
  }

  goToUpdateUser(id: string): void {
    this.router.navigate(['admin', 'users', id, 'update']);
  }

  deleteUser(id: string): void {
    if(confirm('Bạn chắc chắn xóa?')){
      this.usersService.deleteUser(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công';
          this.getUsers();
        }, error: (err) => {
          alert(err);
        }
      })
    }
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      }, error: (err) => {
        alert(err);
      }
    })
  }
}
