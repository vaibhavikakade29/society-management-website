import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout-message',
  templateUrl: './logout-message.component.html',
  styleUrls: ['./logout-message.component.css']
})
export class LogoutMessageComponent implements OnInit {

  title = '';
  message = '';
  icon = '';
  redirectText = '';

  progress = 100;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const role = this.route.snapshot.queryParamMap.get('role');

    if (role === 'admin') {

      this.icon = 'admin_panel_settings';

      this.title = 'Administrator Logged Out';

      this.message =
        'Thank you for managing Vighnahar Residence Society.';

      this.redirectText =
        'Redirecting to Login...';

    }

    else {

      this.icon = 'home';

      this.title = 'Logged Out Successfully';

      this.message =
        'Thank you for being a part of Vighnahar Residence. Have a wonderful day!';

      this.redirectText =
        'Redirecting to Home...';

    }

    const interval = setInterval(() => {

      this.progress -= 100 / 30;

    }, 100);

    setTimeout(() => {

      clearInterval(interval);

      if (role === 'admin') {

        this.router.navigate(['/auth/login']);

      }

      else {

        this.router.navigate(['/']);

      }

    }, 3000);

  }

}