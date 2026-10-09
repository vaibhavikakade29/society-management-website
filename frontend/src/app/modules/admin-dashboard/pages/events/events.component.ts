import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventForm = {
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: ''
  };

  events: any[] = [];
  isEditMode = false;
  editId = '';

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
      alert("Failed to load events");
    }
  });
}
 createEvent(): void {
  this.eventService.createEvent(this.eventForm).subscribe({
    next: () => {
      alert("Event created successfully");
      this.reset();
      this.loadEvents();
    },
    error: (err) => {
      alert(err.error?.message || "Failed to create event");
    }
  });
}

  editEvent(e: any): void {
    this.eventForm = { ...e };
    this.isEditMode = true;
    this.editId = e._id;
  }

updateEvent(): void {
  this.eventService.updateEvent(this.editId, this.eventForm).subscribe({
    next: () => {
      alert("Event updated successfully");
      this.reset();
      this.loadEvents();
    },
    error: (err) => {
      alert(err.error?.message || "Failed to update event");
    }
  });
}

  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }

  reset(): void {
    this.eventForm = {
      title: '',
      description: '',
      eventDate: '',
      eventTime: '',
      location: ''
    };
    this.isEditMode = false;
    this.editId = '';
  }
}