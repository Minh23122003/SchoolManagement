import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Staff, StaffsService } from '../../../services/staffs/staffs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [HomeComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  staffs: Staff[] = [];
  info: string = '';

  constructor (private staffsService: StaffsService, private router: Router) {}

  ngOnInit(): void {
    this.getStaffs();
  }

  getStaffs(): void{
    this.staffsService.getStaffs().subscribe({
      next: (res) => {
        this.staffs = res;
      }, error: (err) => {
        alert(err);
      }
    })
  }

  goToCreateStaff(): void{
    this.router.navigate(['admin', 'staffs', 'create']);
  }

  goToUpdateStaff(id: string): void{
    this.router.navigate(['admin', 'staffs', id, 'update']);
  }

  deleteStaff(id: string): void{
    if(confirm('Bạn chắc chắn xóa?')){
      this.staffsService.deleteStaff(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getStaffs();
        }, error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
