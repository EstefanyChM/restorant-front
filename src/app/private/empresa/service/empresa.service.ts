import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { EmpresaRequest } from '../models/empresa-request';
import { EmpresaResponse } from '../models/empresa-response';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends CrudService<EmpresaRequest, EmpresaResponse>{

  constructor( protected http: HttpClient ) {
    super(http, urlConstants.Empresa)
  }

  createWithFormData(formData: FormData): Observable<EmpresaResponse> {
    return this.http.post<EmpresaResponse>(this.url_service, formData);
  }

  updateWithFormData(id:number, formData: FormData): Observable<EmpresaResponse> {
    return this.http.put<EmpresaResponse>(`${this.url_service}${id}`, formData);
  }


}
