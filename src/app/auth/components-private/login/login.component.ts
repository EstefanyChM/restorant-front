import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthUserService } from '../../services/authUser.service';
import { LoginRequest } from '../../models/login-request.model';
import { Router } from '@angular/router';

import Swal from "sweetalert2";
import { AutenticacionResponse } from 'src/app/auth/models/autenticacion-response';
import { login_error } from 'src/app/shared/functions/general.functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginRequest: LoginRequest = new LoginRequest();

  constructor(
    private fb: FormBuilder,
    private authService: AuthUserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        this.passwordValidator
      ]]
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[\W_]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
    if (!valid) {
      return { passwordStrength: true };
    }

    return null; // Si no hay errores, devolver null para que no interfiera
  }


  loginPersonalEmpresa() {
    this.loginRequest = this.loginForm.getRawValue();
    console.log(this.loginRequest);

    this.authService.signIn(this.loginRequest, true).subscribe({
      next: (data: AutenticacionResponse) => {
        console.log('RESPUESTA: ', data);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        login_error()
      }
    });
  }
}
