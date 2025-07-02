import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  _id: string,
  username: string,
  role: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private urlApiUser = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlApiUser);
  }
  
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.urlApiUser}/${id}`);
  }
  
  postUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.urlApiUser, user);
  }
  
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.urlApiUser}/${user._id}`, user);
  }
  
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.urlApiUser}/${id}`);
  }
}
