import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:5000/api/events';

  constructor(private http: HttpClient) {}

  createEvent(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  getAllEvents() {
    return this.http.get(this.baseUrl);
  }

  updateEvent(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteEvent(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}