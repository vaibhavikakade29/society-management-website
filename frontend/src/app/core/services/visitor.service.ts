import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VisitorService {

  // Change this if your API URL is stored in environment.ts
  private apiUrl = 'http://localhost:5000/api/visitors';

  constructor(private http: HttpClient) { }

  /* ======================================================
      Resident APIs
  ====================================================== */

  // Add Visitor
  addVisitor(visitorData: any): Observable<any> {
    return this.http.post(this.apiUrl, visitorData);
  }

  // Get My Visitors
  getMyVisitors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`);
  }

  // Cancel Visitor
  cancelVisitor(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, {});
  }

  /* ======================================================
      Admin APIs
  ====================================================== */

  // Get All Visitors
  getAllVisitors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

 approveVisitor(id: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/approve`, {});
}

rejectVisitor(id: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/reject`, {});
}

markVisitorEntry(id: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/entry`, {});
}

markVisitorExit(id: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/exit`, {});
}
}