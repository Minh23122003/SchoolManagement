import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService } from '../../../services/subjects/subjects.service';

@Component({
  selector: 'app-update',
  imports: [HomeComponent, FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  id: string = '';
  subject!: Subject;
  error: string = '';

  constructor (private router: Router, private subjectsService: SubjectsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getSubjectById();
  }

  getSubjectById(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.subjectsService.getSubjectById(this.id).subscribe({
      next: (res) => {
        this.subject = res;
      }
    });
  }

  updateSubject(): void{
    if(this.subject.name === ''){
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
    }else {console.log(this.subject);
      this.subjectsService.updateSubject(this.subject).subscribe({
        next: (res) => {
          alert('Cập nhật thành công!');
          this.router.navigate(['admin', 'subjects']);
        }, error: (err) => {
          this.error = err.error.message;
        }
      })
    }
  }
}
