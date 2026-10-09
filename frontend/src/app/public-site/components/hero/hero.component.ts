import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {

  images: string[] = [
    'assets/images/hero2.jpg',
    'assets/images/hero3.jpg'
  ];

  currentImage = 0;

  private intervalId: any;

  ngOnInit(): void {

    this.intervalId = setInterval(() => {
      this.currentImage =
        (this.currentImage + 1) % this.images.length;
    }, 5000);

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}