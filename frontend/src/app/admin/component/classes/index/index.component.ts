import { Component, OnInit } from '@angular/core';
import { Class, ClassesService } from '../../../../services/classes/classes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  classes: Class[] = [];
  info: string = '';

  constructor (private classesService: ClassesService, private router: Router) {}
  
  ngOnInit(): void {
    this.getClasses();
  }

  goToCreateClass(): void {
    this.router.navigate(['admin', 'classes', 'create']);
  }

  goToUpdateClass(id: string): void {
    this.router.navigate(['admin', 'classes', id, 'update']);
  }

  deleteClass(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.classesService.deleteClass(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getClasses();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
  }

  getClasses(): void {
    this.classesService.getClasses().subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
