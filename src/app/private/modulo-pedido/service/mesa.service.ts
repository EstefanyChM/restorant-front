import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { MesaResponse } from '../models/mesa-response.model';
import { MesaRequest } from '../models/mesa-request.model';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class MesaService extends CrudService<MesaRequest, MesaResponse> {

  constructor(protected http: HttpClient,) {
    super(http, urlConstants.Mesa);
  }
}
