import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private apiUrl = 'http://localhost:5000/api/rules';

  constructor(
    private http: HttpClient
  ) { }

  /*=========================================================
      GET ALL RULES
  =========================================================*/

  getRules(): Observable<any> {

    return this.http.get(this.apiUrl);

  }

  /*=========================================================
      GET RULE BY ID
  =========================================================*/

  getRuleById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/${id}`

    );

  }

  /*=========================================================
      ADD RULE
  =========================================================*/

  addRule(rule: any): Observable<any> {

    return this.http.post(

      this.apiUrl,

      rule

    );

  }

  /*=========================================================
      UPDATE RULE
  =========================================================*/

  updateRule(
    id: string,
    rule: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      rule

    );

  }

  /*=========================================================
      DELETE RULE
  =========================================================*/

  deleteRule(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}