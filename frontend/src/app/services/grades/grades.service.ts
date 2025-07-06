import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Grade {
  _id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  private urlApiGrade = "http://localhost:3000/grades";

  constructor(private http: HttpClient) { }

  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.urlApiGrade);
  }

  getGradeById(id: string): Observable<Grade> {
    return this.http.get<Grade>(`${this.urlApiGrade}/${id}`);
  }

  postGrade(grade: Partial<Grade>): Observable<Grade> {
    return this.http.post<Grade>(this.urlApiGrade, grade);
  }

  updateGrade(grade: Grade): Observable<Grade> {
    return this.http.patch<Grade>(`${this.urlApiGrade}/${grade._id}`, grade);
  }

  deleteGrade(id: string): Observable<Grade> {
    return this.http.delete<Grade>(`${this.urlApiGrade}/${id}`);
  }
}
