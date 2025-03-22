import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { AuthUserService } from 'src/app/auth/services/authUser.service';
import { OnlineUserResponse } from 'src/app/private/cliente/models/online-user-response.model';
import { ClienteService } from 'src/app/private/cliente/service/cliente.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent implements OnInit {

  onlineUserBack: OnlineUserResponse = new OnlineUserResponse;

  myFormDatos = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    idPersonaTipoDocumento: [0, Validators.required],
    numeroDocumento: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],

  });

  constructor(
    private _clienteService: ClienteService,
    private _userService :UserService,
    private _authUserService: AuthUserService,
    private fb: FormBuilder,
  ) { };

  ngOnInit(): void {
   this._clienteService.getByIdOnlineUser(this._authUserService.getUserId()!).subscribe({
    next: (data:OnlineUserResponse)=> {
      this.onlineUserBack = data;
      console.log('eres: ', this.onlineUserBack);


      this.myFormDatos.patchValue({
        nombre: this.onlineUserBack.nombre,
        apellidos: this.onlineUserBack.apellidos,
        idPersonaTipoDocumento: this.onlineUserBack.idPersonaTipoDocumento,
        numeroDocumento: this.onlineUserBack.numeroDocumento,
        phoneNumber: this.onlineUserBack.celular,
        email: this.onlineUserBack.email // Assuming you add an email property to OnlineUserResponse
      });

      this._userService.actualizarUsuario(this.onlineUserBack.nombre!)
    },
   })
  }

  addUser() {
    console.log(this.myFormDatos.value);
  }

}
