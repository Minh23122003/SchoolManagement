import { Injectable } from '@angular/core';
import { Grade } from '../grades/grades.service';
import { Teacher } from '../teachers/teachers.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Class {
  _id: string,
  name: string,
  grade: Grade,
  teacher: Teacher
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private urlApiClass = "http://localhost:3000/classes";

  constructor(private http: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.urlApiClass);
  }

  getClassById(id: string): Observable<Class> {
    return this.http.get<Class>(`${this.urlApiClass}/${id}`);
  }

  postClass(Class: Partial<Class>): Observable<Class> {
    return this.http.post<Class>(this.urlApiClass, Class);
  }

  updateClass(Class: Class): Observable<Class> {
    return this.http.patch<Class>(`${this.urlApiClass}/${Class._id}`, Class);
  }

  deleteClass(id: string): Observable<Class> {
    return this.http.delete<Class>(`${this.urlApiClass}/${id}`);
  }
}
