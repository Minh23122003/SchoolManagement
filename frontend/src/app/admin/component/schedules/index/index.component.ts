import { Component, OnInit } from '@angular/core';
import { Schedule, SchedulesService } from '../../../../services/schedules/schedules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  schedules: Schedule[] = [];
  info: string = '';

  constructor (private schedulesService: SchedulesService, private router: Router) {}
  
  ngOnInit(): void {
    this.getSchedules();
  }

  goToCreateSchedule(): void {
    this.router.navigate(['admin', 'schedules', 'create']);
  }

  goToUpdateSchedule(id: string): void {
    this.router.navigate(['admin', 'schedules', id, 'update']);
  }

  deleteSchedule(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.schedulesService.deleteSchedule(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getSchedules();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
  }

  getSchedules(): void {
    this.schedulesService.getSchedules().subscribe({
      next: (res) => {
        this.schedules = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
