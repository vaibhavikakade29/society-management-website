import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  private apiUrl =
    'http://localhost:5000/api/residents';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Authorization Header
   */
  private getHeaders(): HttpHeaders {

    const token =
      sessionStorage.getItem('token');

    return new HttpHeaders({

      Authorization: `Bearer ${token}`

    });

  }

  /**
   * Get All Residents
   */
  getResidents(): Observable<any> {

    return this.http.get(

      this.apiUrl,

      {

        headers: this.getHeaders()

      }

    );

  }

  /**
   * Approve Resident
   */
  approveResident(id: string): Observable<any> {

    return this.http.patch(

      `${this.apiUrl}/${id}/approve`,

      {},

      {

        headers: this.getHeaders()

      }

    );

  }

  /**
   * Reject Resident
   */
  rejectResident(id: string): Observable<any> {

    return this.http.patch(

      `${this.apiUrl}/${id}/reject`,

      {},

      {

        headers: this.getHeaders()

      }

    );

  }

}