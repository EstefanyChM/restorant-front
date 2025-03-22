import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { VentaRequest } from '../../modulo-pedido-venta/models/venta-request';
import { VentaResponse } from '../../modulo-pedido-venta/models/venta-response';
import { CrudService } from 'src/app/core/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends CrudService<VentaRequest, VentaResponse> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.Venta); // Actualización en el endpoint
  }
}
