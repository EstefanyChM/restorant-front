import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { CrudService } from 'src/app/core/services/crud.service';

import { SuscripcionRequest } from '../../colecciones/models/suscripcion-request.model';
import { SuscripcionResponse } from '../../colecciones/models/suscripcion-response.model';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService extends CrudService<SuscripcionRequest, SuscripcionResponse> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.Subscripcion);
  }
}
