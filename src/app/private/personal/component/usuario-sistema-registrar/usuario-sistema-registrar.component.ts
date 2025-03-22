import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { UsuarioSistemaRegistrar } from '../../models/usuario-sistema-registrar.model';
import { AutenticacionResponse } from 'src/app/auth/models/autenticacion-response';
import { alert_success } from 'src/app/shared/functions/general.functions';

@Component({
  selector: 'app-usuario-sistema-registrar',
  templateUrl: './usuario-sistema-registrar.component.html',
  styleUrl: './usuario-sistema-registrar.component.scss'
})
export class UsuarioSistemaRegistrarComponent implements OnInit {
  registroEnvio: UsuarioSistemaRegistrar = new UsuarioSistemaRegistrar();

  myForm:FormGroup;

  @Output() closeRegisterModal = new EventEmitter<void>();  // Evento para cerrar el modal de login
  @Output() personalRegistrado = new EventEmitter<boolean>();


  ngOnInit() { }

  constructor(private fb: FormBuilder, private _authUserService: AuthUserService
  ) {
    this.myForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        this.passwordValidator
      ]],
      cargo:['', [Validators.required]],
      confirmarPassword: ['', [Validators.required]],
    },
    {
      validators: this.passwordMatchValidator // Validador personalizado para confirmar contraseña
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmarPassword = formGroup.get('confirmarPassword')?.value;

    // Muestra el error si uno de los campos está vacío o si no coinciden
    return password === confirmarPassword || (!password && !confirmarPassword) ? null : { mismatch: true };
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

  @Input() idPersonalEmpresa: number = 0;

  registrarUsuarioSistema() {
    console.log(this.idPersonalEmpresa);

    const formValue = this.myForm.getRawValue();
    this.registroEnvio = formValue;
    this.registroEnvio.idPersonalEmpresa=this.idPersonalEmpresa;
    this.registroEnvio.celular = formValue['phoneNumber']
    console.log('**************');
    console.log(this.registroEnvio);

    this._authUserService.registrarUsuarioSistema(this.registroEnvio).subscribe({
      next: (data: AutenticacionResponse) => {
        alert_success('Registro exitoso', 'Tu usuario ha sido registrado, ahora tiene permiso de entrada al sistema')
        this.personalRegistrado.emit(false)

      },
      error: () => {
        alert('No se pudo crear el usuario');
      },
      complete:() => {
      }
    });
  }
}
