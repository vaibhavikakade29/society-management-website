import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PageLoaderService } from 'src/app/core/services/page-loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private pageLoader: PageLoaderService
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ],

      remember: [
        false
      ]

    });

  }

  /**
   * Login User
   */
  login(): void {

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();

    return;

  }

  this.isLoading = true;

  const loginData = {

    email: this.loginForm.value.email.trim(),

    password: this.loginForm.value.password

  };

  this.authService.login(loginData)

    .subscribe({

      next: (response) => {

        this.isLoading = false;

        this.authService.saveToken(response.token);

        this.authService.saveUser(response.user);

        this.toast.showSuccess(response.message);

        if (response.user.role === 'admin') {

          this.pageLoader.show(

            'Welcome Administrator',

            'Opening Admin Dashboard...',

            'admin_panel_settings'

          );

          setTimeout(() => {

            this.router.navigate([
              '/admin-dashboard'
            ]);

            this.pageLoader.hide();

          }, 1200);

        }

        else {

          this.pageLoader.show(

            'Welcome Home',

            'Opening Resident Dashboard...',

            'home'

          );

          setTimeout(() => {

            this.router.navigate([
              '/resident-dashboard'
            ]);

            this.pageLoader.hide();

          }, 1200);

        }

      },

      error: (error) => {

        this.isLoading = false;

        this.toast.showError(

          error.error?.message ||

          'Unable to login.'

        );

      }

    });

}
}