import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { EmpresaRequest } from '../models/empresa-request';
import { EmpresaResponse } from '../models/empresa-response';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { Observable } from 'rxjs';
import { ServicioRequest } from '../models/servicio-request.model';
import { ServicioResponse } from '../models/servicio-response.model';

@Injectable({
  providedIn: 'root'
})
export class NuestrosServiciosService extends CrudService<ServicioRequest, ServicioResponse>{

  constructor( protected http: HttpClient ) {
    super(http, urlConstants.Servicios)
  }

}
