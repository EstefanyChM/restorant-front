import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { OnlineUserRegistoRequest } from 'src/app/auth/models/online-user-registo-request.model';
import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { RegistroResponse } from 'src/app/public/models/registro-response';
import { AutenticacionResponse } from 'src/app/auth/models/autenticacion-response';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  registroEnvio: OnlineUserRegistoRequest = new OnlineUserRegistoRequest();
  tipoDocumentos: any[] = [
    { label: 'DNI', value: 1 },
    { label: 'RUC', value: 2 },
    { label: 'Carné de extranjería', value: 3 },
    { label: 'Pasaporte', value: 4 },
  ];

  constructor(
    private fb: FormBuilder,
    private _authUserService: AuthUserService,
    private router: Router) {
    this.myForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellidos: ['', [Validators.required, Validators.minLength(3)]],
        idPersonaTipoDocumento: [0, [Validators.required]],
        numeroDocumento: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            this.passwordValidator,
          ],
        ],
        confirmarPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator, // Validador personalizado para confirmar contraseña
      }
    );

    // Escuchar cambios en el tipo de documento
    this.myForm.get('idPersonaTipoDocumento')?.valueChanges.subscribe((value) => {
      this.updateDocumentoValidator(value);
    });
  }

  // Método para actualizar la validación según el tipo de documento seleccionado
  updateDocumentoValidator(tipoDocumento: number) {
    const numeroDocumentoControl = this.myForm.get('numeroDocumento');

    switch (tipoDocumento) {
      case 1:
        // DNI (8 dígitos)
        numeroDocumentoControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')]);
        break;
      case 2:
        // RUC (11 dígitos)
        numeroDocumentoControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{11}$')]);
        break;
      case 3:
        // Carné de extranjería (9 dígitos)
        numeroDocumentoControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{9}$')]);
        break;
      default:
        // Pasaporte (sin restricción de longitud, solo requerido)
        numeroDocumentoControl?.setValidators([Validators.required]);
        break;
    }
    // Refrescar la validación del campo
    numeroDocumentoControl?.updateValueAndValidity();
  }


  getDocumentoLength(): number {
    const tipoDocumento = this.myForm.get('idPersonaTipoDocumento')?.value;
    switch (tipoDocumento) {
      case 1:
        return 8; // DNI
      case 2:
        return 11; // RUC
      case 3:
        return 9; // Carné de extranjería
      default:
        return 0; // Pasaporte (no tiene restricción)
    }
  }



  ngOnInit() {

  }

  registrarOnlineUser() {
    const formValue = this.myForm.getRawValue();
    formValue.idPersonaTipoDocumento = parseInt(formValue.idPersonaTipoDocumento, 10);
    this.registroEnvio = formValue;
    console.log('mando: ', this.registroEnvio);

    this._authUserService.registrarOnlineCliente(this.registroEnvio).subscribe({
      next: (data: AutenticacionResponse) => {
        //this.router.navigate(['/perfil'])

        // Redirigir a '/perfil' antes de mostrar el mensaje
        this.router.navigate(['/perfil']).then(() => {
          alert_success('Registro exitoso', 'Tu usuario ha sido registrado, ya puedes iniciar sesión. verifica tu email (miento, falta este proceso) (acá dice que debe autoririgirme a perfil, pero el guard no me deja, register si me devulve el token)');
        });

        this.closeRegisterModal.emit();
        this.closeLoginModal.emit();


      },
      error: () => {
        alert('No se pudo crear el usuario');
      },
      complete: () => {
      }
    });
  }

  // Validador personalizado para confirmar contraseñas
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmarPassword = formGroup.get('confirmarPassword')?.value;

    // Muestra el error si uno de los campos está vacío o si no coinciden
    return password === confirmarPassword || (!password && !confirmarPassword) ? null : { mismatch: true };
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
  @Output() closeRegisterModal = new EventEmitter<void>();  // Evento para cerrar el modal de login
  @Output() closeLoginModal = new EventEmitter<void>();  // Evento para cerrar el modal de login
  @Output() openLoginModalFR = new EventEmitter<void>();  // Evento para cerrar el modal de login



  volverAlLogin() {
    this.closeRegisterModal.emit();
    this.openLoginModalFR.emit();
  }
}
