import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageLoaderService } from 'src/app/core/services/page-loader.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
constructor(
    private router: Router,
    private loader: PageLoaderService
  ) { }

  navigateWithLoader(
    route: string,
    title: string,
    subtitle: string,
    icon: string
  ): void {

    this.loader.show(
      title,
      subtitle,
      icon
    );

    setTimeout(() => {

      this.router.navigate([route]);

      this.loader.hide();

    }, 900);

  }

}
