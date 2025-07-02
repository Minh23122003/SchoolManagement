import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Subject {
  _id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private urlApiSubject = "http://localhost:3000/subjects";

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.urlApiSubject);
  }

  getSubjectById(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.urlApiSubject}/${id}`);
  }

  postSubject(subject: Partial<Subject>): Observable<Subject> {
    return this.http.post<Subject>(this.urlApiSubject, subject);
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.patch<Subject>(`${this.urlApiSubject}/${subject._id}`, subject);
  }

  deleteSubject(id: string): Observable<Subject> {
    return this.http.delete<Subject>(`${this.urlApiSubject}/${id}`);
  }
}
