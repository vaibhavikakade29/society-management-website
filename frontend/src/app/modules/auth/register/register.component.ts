import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PageLoaderService } from 'src/app/core/services/page-loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  wings: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G'
  ];

  flatNumbers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private pageLoader: PageLoaderService
  ) {

    this.registerForm = this.fb.group(

      {

        fullName: [

          '',

          [

            Validators.required,

            Validators.pattern('^[A-Za-z ]+$')

          ]

        ],

        email: [

          '',

          [

            Validators.required,

            Validators.email

          ]

        ],

        phone: [

          '',

          [

            Validators.required,

            Validators.pattern('^[6-9][0-9]{9}$')

          ]

        ],

        userType: [

          '',

          Validators.required

        ],

        committeeRole: [

          'Resident'

        ],

        ownerName: [

          ''

        ],

        relationship: [

          ''

        ],

        wing: [

          '',

          Validators.required

        ],

        flatNo: [

          '',

          Validators.required

        ],

        emergencyContactName: [

          '',

          Validators.required

        ],

        emergencyContactNumber: [

          '',

          [

            Validators.required,

            Validators.pattern('^[6-9][0-9]{9}$')

          ]

        ],

        password: [

          '',

          [

            Validators.required,

            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            )

          ]

        ],

        confirmPassword: [

          '',

          Validators.required

        ]

      },

      {

        validators: this.passwordMatchValidator

      }

    );

    /*=========================================================
      DYNAMIC VALIDATORS
    =========================================================*/

    this.registerForm.get('userType')?.valueChanges.subscribe(

      (value) => {

        const ownerName = this.registerForm.get('ownerName');

        const relationship = this.registerForm.get('relationship');

        const committeeRole = this.registerForm.get('committeeRole');

        ownerName?.clearValidators();

        relationship?.clearValidators();

        committeeRole?.clearValidators();

        if (value === 'owner') {

          committeeRole?.setValidators([
            Validators.required
          ]);

        }

        if (value === 'tenant') {

          ownerName?.setValidators([
            Validators.required
          ]);

        }

        if (value === 'family') {

          relationship?.setValidators([
            Validators.required
          ]);

        }

        ownerName?.updateValueAndValidity();

        relationship?.updateValueAndValidity();

        committeeRole?.updateValueAndValidity();

      }

    );

  }

  /*=========================================================
      LOAD AVAILABLE FLATS
  =========================================================*/

  onWingChange(): void {

    const wing = this.registerForm.get('wing')?.value;

    this.flatNumbers = [];

    if (!wing) {

      return;

    }

    this.authService.getAvailableFlats(wing)

      .subscribe({

        next: (response) => {

          this.flatNumbers = response.flats;

        },

        error: () => {

          this.toast.showError(
            'Unable to load available flats.'
          );

        }

      });

    this.registerForm.patchValue({

      flatNo: ''

    });

  }

  /*=========================================================
      PASSWORD MATCH VALIDATOR
  =========================================================*/

  passwordMatchValidator(

    control: AbstractControl

  ): ValidationErrors | null {

    const password = control.get('password')?.value;

    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword

      ? null

      : {

          passwordMismatch: true

        };

  }

  /*=========================================================
      REGISTER USER
  =========================================================*/

  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    const formData = {

      ...this.registerForm.value,

      fullName: this.registerForm.value.fullName.trim(),

      email: this.registerForm.value.email.trim()

    };

    this.authService.register(formData)

      .subscribe({

        next: (response) => {

          // Success Toast

          this.toast.showSuccess(response.message);

          // Reset Form

          this.registerForm.reset();

          this.flatNumbers = [];

          // Show Loader

          this.pageLoader.show(

            'Registration Successful',

            'Redirecting to Login...',

            'how_to_reg'

          );

          // Redirect

          setTimeout(() => {

            this.pageLoader.hide();

            this.router.navigate([
              '/auth/login'
            ]);

          }, 1300);

        },

        error: (error) => {

          this.toast.showError(

            error.error?.message ||

            'Registration Failed.'

          );

        }

      });

  }

}