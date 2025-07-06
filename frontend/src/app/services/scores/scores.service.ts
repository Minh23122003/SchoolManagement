import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolYear } from '../school-years/school-years.service';
import { Student } from '../students/students.service';
import { Subject } from '../subjects/subjects.service';

export interface Score {
  _id: string,
  score: number,
  type: string,
  semester: number,
  school_year: SchoolYear,
  student: Student,
  subject: Subject
}

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private urlApiScore = "http://localhost:3000/scores";

  constructor(private http: HttpClient) { }

  getScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.urlApiScore);
  }

  getScoreById(id: string): Observable<Score> {
    return this.http.get<Score>(`${this.urlApiScore}/${id}`);
  }

  postScore(score: Partial<Score>): Observable<Score> {
    return this.http.post<Score>(this.urlApiScore, score);
  }

  updateScore(score: Score): Observable<Score> {
    return this.http.patch<Score>(`${this.urlApiScore}/${score._id}`, score);
  }

  deleteScore(id: string): Observable<Score> {
    return this.http.delete<Score>(`${this.urlApiScore}/${id}`);
  }
}
