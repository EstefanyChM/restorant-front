import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { VentaRequest } from '../models/venta-request';
import { VentaResponse } from '../models/venta-response';
import { CrudService } from 'src/app/core/services/crud.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';

@Injectable({
  providedIn: 'root',
})
export class VentaService extends CrudService<VentaRequest, VentaResponse> {
  constructor(protected http: HttpClient) {
    super(http, urlConstants.Venta);
  }

  /*generateComprobante(idVenta: number): Observable<any> {
    return this.http.get<any>(`${urlConstants.Venta}generate-comprobante/${idVenta}`, {});
  }*/

    generateComprobante(idVenta: number): Observable<Blob> {
      return this.http.get<Blob>(`${urlConstants.Venta}generate-comprobante/${idVenta}`, {
        responseType: 'blob' as 'json' // Utiliza 'as json' para evitar el error de tipo
      });
    }

    obtenerVentasDeliveryPagadas(): Observable<VentaResponse[]> {
      return this.http.get<VentaResponse[]>(`${urlConstants.Venta}delivery-en-proceso`);
    }

    obtenerVentasRecojoPagadas(): Observable<VentaResponse[]> {
      console.log('escuch');

      console.log(`${urlConstants.Venta}pickup-en-proceso`);

      return this.http.get<VentaRequest[]>(`${urlConstants.Venta}pickup-en-proceso`);
    }

    generateDetallesCocina(idVenta: number): Observable<Blob> {
      return this.http.get<Blob>(`${urlConstants.Venta}generate-detallesa-cocina/${idVenta}`, {
        responseType: 'blob' as 'json' // Utiliza 'as json' para evitar el error de tipo
      });
    }



}
