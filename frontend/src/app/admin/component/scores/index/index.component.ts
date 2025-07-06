import { Component, OnInit } from '@angular/core';
import { Score, ScoresService } from '../../../../services/scores/scores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  scores: Score[] = [];
  info: string = '';

  constructor (private scoresService: ScoresService, private router: Router) {}
  
  ngOnInit(): void {
    this.getScores();
  }

  goToCreateScore(): void {
    this.router.navigate(['admin', 'scores', 'create']);
  }

  goToUpdateScore(id: string): void {
    this.router.navigate(['admin', 'scores', id, 'update']);
  }

  deleteScore(id: string): void {
    if(confirm('Bạn chắc chắn muốn xóa?')){
      this.scoresService.deleteScore(id).subscribe({
        next: (res) => {
          this.info = 'Xóa thành công!';
          this.getScores();
        },
        error: (err) => {
          alert('lỗi');
        }
      })
    }
  }

  getScores(): void {
    this.scoresService.getScores().subscribe({
      next: (res) => {
        this.scores = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
