import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { Pickup } from '../models/pickup.model';
import { CrudService } from 'src/app/core/services/crud.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PickupService extends CrudService<Pickup, Pickup> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.Pickup)
  }


  generateComprobante(idVenta: number): Observable<Blob> {
        return this.http.get<Blob>(`${urlConstants.Venta}generate-comprobante/${idVenta}`, {
          responseType: 'blob' as 'json' // Utiliza 'as json' para evitar el error de tipo
        });
      }

      obtenerVentasPickupsPagadas(): Observable<Pickup[]> {
        return this.http.get<Pickup[]>(`${urlConstants.Venta}delivery-en-proceso`);
      }

      obtenerVentasRecojoPagadas(): Observable<Pickup[]> {
        return this.http.get<Pickup[]>(`${urlConstants.Venta}pickup-en-proceso`);
      }

      generateDetallesCocina(idVenta: number): Observable<Blob> {
        return this.http.get<Blob>(`${urlConstants.Venta}generate-detallesa-cocina/${idVenta}`, {
          responseType: 'blob' as 'json' // Utiliza 'as json' para evitar el error de tipo
        });
      }

}
