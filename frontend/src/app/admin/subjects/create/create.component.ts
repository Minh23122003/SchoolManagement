import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, SubjectsService } from '../../../services/subjects/subjects.service';

@Component({
  selector: 'app-create',
  imports: [HomeComponent, CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  subject: Partial<Subject> = {
    'name': ''
  };
  error: string = ''

  constructor (private subjectsService: SubjectsService, private router: Router) {}
  
  ngOnInit(): void {
    
  }

  createSubject(): void {
    if(this.subject.name === '') {
      this.error = 'Vui lòng nhập đầy đủ thông tin!'
    } else {
      this.subjectsService.postSubject(this.subject).subscribe({
        next: (res) => {
          alert('Tạo thành công!');
          this.router.navigate(['admin', 'subjects']);
        }, error: (err) => {
          this.error = 'Tên môn học đã tồn tại!'
        }
      })
    }
  }
}
