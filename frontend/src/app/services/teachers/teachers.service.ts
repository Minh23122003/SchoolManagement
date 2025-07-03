import { Injectable } from '@angular/core';
import { User } from '../users/users.service';
import { Subject } from '../subjects/subjects.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  _id: string,
  full_name: string,
  gender: string,
  address: string,
  phone: string,
  email: string,
  user: User,
  subject: Subject
}

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private urlApiTeacher = "http://localhost:3000/teachers";

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
      return this.http.get<Teacher[]>(this.urlApiTeacher);
    }
      
    getTeacherById(id: string): Observable<Teacher> {
      return this.http.get<Teacher>(`${this.urlApiTeacher}/${id}`);
    }
      
    postTeacher(teacher: Partial<Teacher>): Observable<Teacher> {
      return this.http.post<Teacher>(this.urlApiTeacher, teacher);
    }
      
    updateTeacher(teacher: Teacher): Observable<Teacher> {
      return this.http.patch<Teacher>(`${this.urlApiTeacher}/${teacher._id}`, teacher);
    }
      
    deleteTeacher(id: string): Observable<Teacher> {
      return this.http.delete<Teacher>(`${this.urlApiTeacher}/${id}`);
    }
}
