import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SchoolYear {
  _id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class SchoolYearsService {
  private urlApiSchoolYear = "http://localhost:3000/school-years";

  constructor(private http: HttpClient) { }

  getSchoolYears(): Observable<SchoolYear[]> {
    return this.http.get<SchoolYear[]>(this.urlApiSchoolYear);
  }

  getSchoolYearById(id: string): Observable<SchoolYear> {
    return this.http.get<SchoolYear>(`${this.urlApiSchoolYear}/${id}`);
  }

  postSchoolYear(schoolYear: Partial<SchoolYear>): Observable<SchoolYear> {
    return this.http.post<SchoolYear>(this.urlApiSchoolYear, schoolYear);
  }

  updateSchoolYear(schoolYear: SchoolYear): Observable<SchoolYear> {
    return this.http.patch<SchoolYear>(`${this.urlApiSchoolYear}/${schoolYear._id}`, schoolYear);
  }

  deleteSchoolYear(id: string): Observable<SchoolYear> {
    return this.http.delete<SchoolYear>(`${this.urlApiSchoolYear}/${id}`);
  }
}
