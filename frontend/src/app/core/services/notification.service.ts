import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private API = 'http://localhost:5000/api/notifications';

  constructor(private http: HttpClient) {}

  // ============================
  // ADMIN
  // ============================

  getAdminNotifications(): Observable<any> {

    return this.http.get(`${this.API}/admin`);

  }

  // ============================
  // RESIDENT
  // ============================

  getResidentNotifications(): Observable<any> {

    return this.http.get(`${this.API}/resident`);

  }

  // ============================
  // MARK READ
  // ============================

  markAsRead(id: string): Observable<any> {

    return this.http.put(`${this.API}/${id}/read`, {});

  }

  // ============================
  // DELETE
  // ============================

  deleteNotification(id: string): Observable<any> {

    return this.http.delete(`${this.API}/${id}`);

  }

}