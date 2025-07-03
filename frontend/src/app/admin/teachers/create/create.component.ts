import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Teacher, TeachersService } from '../../../services/teachers/teachers.service';
import { User, UsersService } from '../../../services/users/users.service';
import { Subject, SubjectsService } from '../../../services/subjects/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [HomeComponent, FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  teacher: Partial<Teacher> = {
  
  };
  users: User[] = [];
  subjects: Subject[] = [];
  error: string = '';

  constructor (private teachersService: TeachersService, 
    private usersService: UsersService,
    private subjectsSerivce: SubjectsService, 
    private router: Router) {}

  ngOnInit(): void {
    this.getSubjects();
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsersByRole('teacher').subscribe({
      next: (res) => {
        this.users = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  getSubjects(): void {
    this.subjectsSerivce.getSubjects().subscribe({
      next: (res) => {
        this.subjects = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  createTeacher(): void {
    if(!this.teacher.full_name || !this.teacher.gender || !this.teacher.address 
      || !this.teacher.phone || !this.teacher.email || !this.teacher.user || !this.teacher.subject){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.teacher.email.substring(this.teacher.email.length - 10) !== '@gmail.com'){
      this.error = 'Email không hợp lệ!';
    }else{
      this.teacher.phone = String(this.teacher.phone);
      this.teachersService.postTeacher(this.teacher).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'teachers']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
