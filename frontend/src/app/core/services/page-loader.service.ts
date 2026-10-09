import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {

  /*=========================================================
      LOADER VISIBILITY
  =========================================================*/

  private visibleSubject = new BehaviorSubject<boolean>(false);

  visible$ = this.visibleSubject.asObservable();

  /*=========================================================
      TITLE
  =========================================================*/

  private titleSubject = new BehaviorSubject<string>('Loading');

  title$ = this.titleSubject.asObservable();

  /*=========================================================
      SUBTITLE
  =========================================================*/

  private subtitleSubject = new BehaviorSubject<string>('Please wait...');

  subtitle$ = this.subtitleSubject.asObservable();

  /*=========================================================
      ICON
  =========================================================*/

  private iconSubject = new BehaviorSubject<string>('apartment');

  icon$ = this.iconSubject.asObservable();

  /*=========================================================
      SHOW LOADER
  =========================================================*/

  show(
    title: string,
    subtitle: string,
    icon: string = 'apartment'
  ): void {

    this.titleSubject.next(title);

    this.subtitleSubject.next(subtitle);

    this.iconSubject.next(icon);

    this.visibleSubject.next(true);

  }

  /*=========================================================
      HIDE LOADER
  =========================================================*/

  hide(): void {

    this.visibleSubject.next(false);

  }

}