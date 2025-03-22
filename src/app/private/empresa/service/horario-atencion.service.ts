import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { EmpresaRequest } from '../models/empresa-request';
import { EmpresaResponse } from '../models/empresa-response';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { Observable } from 'rxjs';
import { HorarioAtencionRequest } from '../models/horario-atencion-request.model';
import { HorarioAtencionResponse } from '../models/horario-atencion-response.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService extends CrudService<HorarioAtencionRequest, HorarioAtencionResponse>{

  constructor( protected http: HttpClient ) {
    super(http, urlConstants.HorarioAtencion)
  }
}
