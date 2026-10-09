import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<any>({
    show: false,
    message: '',
    type: 'success'
  });

  toast$ = this.toastSubject.asObservable();

  showSuccess(message: string): void {

    this.toastSubject.next({
      show: true,
      message,
      type: 'success'
    });

    setTimeout(() => {
      this.hide();
    }, 3000);

  }

  showError(message: string): void {

    this.toastSubject.next({
      show: true,
      message,
      type: 'error'
    });

    setTimeout(() => {
      this.hide();
    }, 3000);

  }

  showInfo(message: string): void {

    this.toastSubject.next({
      show: true,
      message,
      type: 'info'
    });

    setTimeout(() => {
      this.hide();
    }, 3000);

  }

  hide(): void {

    this.toastSubject.next({
      show: false,
      message: '',
      type: 'success'
    });

  }

}