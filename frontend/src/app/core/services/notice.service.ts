import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private apiUrl = 'http://localhost:5000/api/notices';

  constructor(private http: HttpClient) {}

  // ======================
  // HEADERS (TOKEN + CACHE FIX)
  // ======================
  private getHeaders() {
    const token = sessionStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      })
    };
  }

  // ======================
  // CREATE NOTICE
  // ======================
  createNotice(notice: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      notice,
      this.getHeaders()
    );
  }

  // ======================
  // GET ALL NOTICES (CACHE BUST FIX)
  // ======================
  getAllNotices(): Observable<any> {

    const url = `${this.apiUrl}?t=${new Date().getTime()}`;

    return this.http.get(
      url,
      this.getHeaders()
    );
  }

  // ======================
  // GET NOTICE BY ID
  // ======================
  getNoticeById(id: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }

  // ======================
  // UPDATE NOTICE
  // ======================
  updateNotice(id: string, noticeData: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      noticeData,
      this.getHeaders()
    );
  }

  // ======================
  // DELETE NOTICE
  // ======================
  deleteNotice(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }
}