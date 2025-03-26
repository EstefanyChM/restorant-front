import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { PersonalEmpresaResponse } from '../models/personal-empresa-response.model';
import { PersonalEmpresaRequest } from '../models/personal-empresa-request.model';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSistemaService  extends CrudService<PersonalEmpresaRequest, PersonalEmpresaResponse> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.PersonalEmpresa);
  }

  /*createWithFormData(formData: FormData): Observable<PersonalEmpresaResponse> {
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.post<PersonalEmpresaResponse>(this.url_service, formData);
  }

  updateWithFormData(id: number, formData: FormData): Observable<PersonalEmpresaResponse> {
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    return this.http.put<PersonalEmpresaResponse>(`${this.url_service}${id}`, formData);
  }

  rangoSalarios(): Observable<number[]> {
    return this._http.get<number[]>(`${this.url_service}rangoSalarios`);
  }*/

}
