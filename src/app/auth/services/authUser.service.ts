import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { CrudService } from 'src/app/core/services/crud.service';
import { OnlineUserRegistoRequest } from '../models/online-user-registo-request.model';
import { OnlineUserRegistoResponse } from '../models/online-user-registo-response';
import { AutenticacionResponse } from '../models/autenticacion-response';
import { LoginRequest } from '../models/login-request.model';
import { UsuarioSistemaRegistrar } from 'src/app/private/personal/models/usuario-sistema-registrar.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(protected http: HttpClient) {}


  signIn(loginRequest: LoginRequest, esPersonal: boolean): Observable<AutenticacionResponse> {

    return this.http.post<AutenticacionResponse>(
      `${urlConstants.AuthUser}/login?esPersonal=${esPersonal}`,
      loginRequest,
    ).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUserId(response.idUsuario);
        this.setEsPersonal(response.esPersonal)
      })
    );
  }


  registrarOnlineCliente(onlineUserRegistro: OnlineUserRegistoRequest): Observable<AutenticacionResponse> {
    return this.http.post<AutenticacionResponse>(`${urlConstants.AuthUser}/registrar/OnlineClient`, onlineUserRegistro);
  }

  registrarUsuarioSistema(usuarioSistemaRegistro: UsuarioSistemaRegistrar): Observable<AutenticacionResponse> {
    return this.http.post<AutenticacionResponse>(`${urlConstants.AuthUser}/registrar/UsuarioSistema`, usuarioSistemaRegistro);
  }

  /********************************** */
  setEsPersonal(esPersonal: boolean): void {
    const rol = esPersonal?'SiEsPersonal':'NoEsPersonal'
    sessionStorage.setItem('esPersonal', rol);
  }

  getEsPersonal(): string | null {
    return sessionStorage.getItem('esPersonal');
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearUser(): void {
    console.log('debo limpiar');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    //this.usuarioSubject.next(null); // Notifica que el usuario cerró sesión
  }


  setUserId(id: number): void {
    sessionStorage.setItem('userId', id.toString());
    //this.usuarioSubject.next(id); // Notifica el cambio de usuario
  }

  getUserId(): number | null {
    const id = sessionStorage.getItem('userId');
    return id ? Number(id) : null;
  }
}
