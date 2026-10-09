import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = 'http://localhost:5000/api/complaints';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Resident
   */
  submitComplaint(data: any): Observable<any> {

    return this.http.post(

      this.apiUrl,

      data

    );

  }

  /**
   * Resident
   */
  getMyComplaints(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/my`

    );

  }

  /**
   * Admin
   */
  getAllComplaints(): Observable<any> {

    return this.http.get(

      this.apiUrl

    );

  }

  /**
   * Common
   */
  getComplaintById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/${id}`

    );

  }

  /**
   * Admin
   */
  updateStatus(id: string, status: string): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}/status`,

      {

        status

      }

    );

  }

  /**
   * Admin
   */
  updateRemarks(
    id: string,
    adminRemarks: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}/remarks`,

      {

        adminRemarks

      }

    );

  }

}