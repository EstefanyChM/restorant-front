import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { VentaRequest } from '../models/venta-request';
import { VentaResponse } from '../models/venta-response';
import { CrudService } from 'src/app/core/services/crud.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    obtenerVentasOnlinePagadas(idService : number): Observable<VentaResponse[]> {
      return this.http.get<VentaResponse[]>(`${urlConstants.Venta}VentaOnlinePagada/${idService}`);
    }

    generateDetallesCocina(idVenta: number): Observable<Blob> {
      return this.http.get<Blob>(`${urlConstants.Venta}generate-detallesa-cocina/${idVenta}`, {
        responseType: 'blob' as 'json' // Utiliza 'as json' para evitar el error de tipo
      });
    }

    onlineSalesCount() {
      console.log('escuxaaa 1');

      return this.http.get<number[]>(`${urlConstants.Venta}OnlineSalesCount`);
    }

    storeOrderCount() {
      console.log('escuxaaa 2');
      
      return this.http.get<number>(`${urlConstants.EnTienda}StoreOrderCount`);
    }

}
interface PedidosFinalizados {
      
}
