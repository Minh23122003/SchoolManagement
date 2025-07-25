import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../teachers/teachers.service';
import { Subject } from '../subjects/subjects.service';
import { Class } from '../classes/classes.service';
import { SchoolYear } from '../school-years/school-years.service';

export interface Schedule {
  _id: string,
  weekday: string,
  period: number,
  session: string,
  semester: number,
  school_year: SchoolYear,
  teacher: Teacher,
  subject: Subject,
  class: Class
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private urlApiSchedule = "http://localhost:3000/schedules";

  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.urlApiSchedule);
  }

  getScheduleById(id: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.urlApiSchedule}/${id}`);
  }

  postSchedule(schedule: Partial<Schedule>): Observable<Schedule> {
    return this.http.post<Schedule>(this.urlApiSchedule, schedule);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.patch<Schedule>(`${this.urlApiSchedule}/${schedule._id}`, schedule);
  }

  deleteSchedule(id: string): Observable<Schedule> {
    return this.http.delete<Schedule>(`${this.urlApiSchedule}/${id}`);
  }
}
