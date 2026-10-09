import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

 loadEvents(): void {
  this.eventService.getAllEvents().subscribe({
    next: (res: any) => {
      this.events = res?.events || [];
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}