import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UsersService } from '../../../../services/users/users.service';
import { Subject, SubjectsService } from '../../../../services/subjects/subjects.service';
import { Teacher, TeachersService } from '../../../../services/teachers/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [FormsModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  users: User[] = [];
  subjects: Subject[] = [];
  teacher!: Teacher;
  error: string = '';
  id: string = '';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService
  ) {}

  ngOnInit(): void{
    this.getUsers();
    this.getSubjects();
    this.getTeacherById();
  }

  getTeacherById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.teachersService.getTeacherById(this.id).subscribe({
      next: (res) => {
        this.teacher = res;
      },error: (err) => {
        console.log(err);
      }
    })
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
    this.subjectsService.getSubjects().subscribe({
      next: (res) => {
        this.subjects = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  updateTeacher(): void {
    if(!this.teacher.full_name || !this.teacher.gender || !this.teacher.address 
      || !this.teacher.phone || !this.teacher.email){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else if(this.teacher.email.substring(this.teacher.email.length - 10) !== '@gmail.com'){
      this.error = 'Email không hợp lệ!';
    }else{
      const cloneTeacher = { ...this.teacher };
      cloneTeacher.phone = String(cloneTeacher.phone);
      if (cloneTeacher.user && typeof cloneTeacher.user === 'object') {
        (cloneTeacher as any).user = cloneTeacher.user._id;
      }
      if (cloneTeacher.subject && typeof cloneTeacher.subject === 'object') {
        (cloneTeacher as any).subject = cloneTeacher.subject._id;
      }
      this.teachersService.updateTeacher(cloneTeacher).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['admin', 'teachers']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
