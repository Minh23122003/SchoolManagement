import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Class } from '../classes/classes.service';
import { Observable } from 'rxjs';

export interface Student {
  _id: string,
  first_name: string,
  last_name: string
  gender: string,
  birthday: string,
  address: string,
  class: Class
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private urlApiStudent = "http://localhost:3000/students";

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.urlApiStudent);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.urlApiStudent}/${id}`);
  }

  postStudent(student: Partial<Student>): Observable<Student> {
    return this.http.post<Student>(this.urlApiStudent, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.patch<Student>(`${this.urlApiStudent}/${student._id}`, student);
  }

  deleteStudent(id: string): Observable<Student> {
    return this.http.delete<Student>(`${this.urlApiStudent}/${id}`);
  }
}
