import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request.model';
import { AutenticacionResponse } from 'src/app/auth/models/autenticacion-response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { login_error } from 'src/app/shared/functions/general.functions';
//import { ComponentsService } from 'src/app/shared/components.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() closeLoginM = new EventEmitter<void>();  // Evento para cerrar el modal de login
  @Output() openRegister = new EventEmitter<void>(); // Evento para abrir el modal de registro

  loginForm: FormGroup;
  registroEnvio: LoginRequest = new LoginRequest();

  constructor(
    private _authUserService: AuthUserService,
    private fb: FormBuilder,
    private router: Router,
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

  ngOnInit(): void {
  }

  logearse() {
    this.registroEnvio = this.loginForm.getRawValue();

    this._authUserService.signIn(this.registroEnvio, false).subscribe({
      next: (data: AutenticacionResponse) => {
          console.log("tus crden: ", data);
          this.closeLoginM.emit();
          this.router.navigate(['perfil'])
      },
      error: () => { this.closeLoginM.emit();
        login_error()},
      complete: () => {}
    })

  }

  register() {
    this.closeLoginM.emit(); // Emitimos el evento cuando se quiera cerrar el modal
    this.openRegister.emit(); // Emitimos el evento para abrir el modal de Register
  }

  forgotPwd() {
  }

  passwordValidator(control: AbstractControl ): ValidationErrors | null {
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

}
