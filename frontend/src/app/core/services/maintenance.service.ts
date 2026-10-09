import { Injectable } from '@angular/core';

import {

  HttpClient,

  HttpHeaders

} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class MaintenanceService {

  private apiUrl = 'http://localhost:5000/api/maintenance';

  constructor(

    private http: HttpClient

  ) { }

  /**
   * ==========================================
   * Authorization Header
   * ==========================================
   */
  private getHeaders(): HttpHeaders {

    const token = sessionStorage.getItem('token');

    return new HttpHeaders({

      Authorization: `Bearer ${token}`

    });

  }

  /**
   * ==========================================
   * Admin
   * Generate Maintenance Bill
   * ==========================================
   */
  generateBill(data: any): Observable<any> {

    return this.http.post(

      this.apiUrl,

      data,

      {

        headers: this.getHeaders()

      }

    );

  }

  /**
   * ==========================================
   * Admin
   * Get All Bills
   * ==========================================
   */
  getAllBills(): Observable<any> {

    return this.http.get(

      this.apiUrl,

      {

        headers: this.getHeaders()

      }

    );

  }

  /**
   * ==========================================
   * Resident
   * Get My Bills
   * ==========================================
   */
  getMyBills(): Observable<any> {

  return this.http.get(

    `${this.apiUrl}/my`,

    {

      headers: this.getHeaders()

    }

  );

}

  /**
   * ==========================================
   * Common
   * Get Bill By ID
   * ==========================================
   */
  getBillById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/${id}`,

      {

        headers: this.getHeaders()

      }

    );

  }

  /**
   * ==========================================
   * Resident
   * Pay Maintenance Bill
   * ==========================================
   */
  payBill(
  id: string,
  paymentData: any
): Observable<any> {

  return this.http.put(

    `${this.apiUrl}/${id}/pay`,

    paymentData,

    {

      headers: this.getHeaders()

    }

  );

}

  /**
   * ==========================================
   * Admin
   * Update Bill Status
   * ==========================================
   */
  updateStatus(

  id: string,

  status: string

): Observable<any> {

  return this.http.put(

    `${this.apiUrl}/${id}/status`,

    {

      status

    },

    {

      headers: this.getHeaders()

    }

  );

}
  /**
   * ==========================================
   * Admin
   * Delete Maintenance Bill
   * ==========================================
   */
  deleteBill(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      {

        headers: this.getHeaders()

      }

    );

  }
  /**
 * ==========================================
 * Admin
 * Update Maintenance Bill
 * ==========================================
 */
updateBill(id: string, data: any): Observable<any> {

  return this.http.put(

    `${this.apiUrl}/${id}`,

    data,

    {

      headers: this.getHeaders()

    }

  );

}
verifyPayment(id: string) {

  return this.http.put(

    `${this.apiUrl}/${id}/verify`,

    {},

    {
      headers: this.getHeaders()
    }

  );

}

rejectPayment(id: string, remarks: string = 'Payment Rejected') {

  return this.http.put(

    `${this.apiUrl}/${id}/reject`,

    {
      remarks
    },

    {
      headers: this.getHeaders()
    }

  );

}

confirmCashPayment(id: string) {

  return this.http.put(

    `${this.apiUrl}/${id}/cash`,

    {},

    {
      headers: this.getHeaders()
    }

  );

}

}
