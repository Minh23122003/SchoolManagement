import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, SubjectsService } from '../../../../services/subjects/subjects.service';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  subjects: Subject[] = [];
  info: string = '';

  constructor (private subjectsService: SubjectsService, private router: Router) {}
  
  ngOnInit(): void {
    this.getSubjects();
  }

  goToCreateSubject(): void {
    this.router.navigate(['admin', 'subjects', 'create']);
  }

  goToUpdateSubject(id: string): void {
    this.router.navigate(['admin', 'subjects', id, 'update']);
  }

  deleteSubject(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.subjectsService.deleteSubject(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getSubjects();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
  }

  getSubjects(): void {
    this.subjectsService.getSubjects().subscribe({
      next: (res) => {
        this.subjects = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
