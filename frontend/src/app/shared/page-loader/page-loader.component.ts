import { Component } from '@angular/core';
import { PageLoaderService } from 'src/app/core/services/page-loader.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css']
})
export class PageLoaderComponent {

  visible$ = this.loader.visible$;

  title$ = this.loader.title$;

  subtitle$ = this.loader.subtitle$;

  icon$ = this.loader.icon$;

  constructor(
    private loader: PageLoaderService
  ) { }

}