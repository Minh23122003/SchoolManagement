import { Injectable } from '@angular/core';
import { User } from '../users/users.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  _id: string,
  full_name: string,
  gender: string,
  address: string,
  phone: string,
  email: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  private urlApiStaff = "http://localhost:3000/staffs";

  constructor(private http: HttpClient) { }

  getStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.urlApiStaff);
  }
    
  getStaffById(id: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.urlApiStaff}/${id}`);
  }
    
  postStaff(staff: Partial<Staff>): Observable<Staff> {
    return this.http.post<Staff>(this.urlApiStaff, staff);
  }
    
  updateStaff(staff: Staff): Observable<Staff> {
    return this.http.patch<Staff>(`${this.urlApiStaff}/${staff._id}`, staff);
  }
    
  deleteStaff(id: string): Observable<Staff> {
    return this.http.delete<Staff>(`${this.urlApiStaff}/${id}`);
  }
}
