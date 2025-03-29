import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = `${urlConstants.ProcesamientoPagos}mercadopago/procesar`;

  constructor(private http: HttpClient) {}

  procesarPagoMercadoPago(pedidoRequest: any) {
   return this.http.post<{ initPoint: string , id:number}>(this.apiUrl, pedidoRequest);

  }

}
