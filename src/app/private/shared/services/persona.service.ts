import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { PersonaResponse } from '../models/persona-response.model';
import { PersonaRequest } from '../models/persona-request.model';
import { CrudService } from 'src/app/core/services/crud.service';
import { catchError } from 'rxjs/operators';

import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService extends CrudService<PersonaRequest, PersonaResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.persona);
  }

  //API DE PERSONA
  consultarPersona(tipoDocumento: number, numeroDocumento: string): Observable<any> {
    console.log(`DESDE SERVICIO PERSONA:  ${urlConstants.persona}${tipoDocumento}/${numeroDocumento}`); //persona
    return this.http.get<any>(`${urlConstants.persona}${tipoDocumento}/${numeroDocumento}`);
  }
}



