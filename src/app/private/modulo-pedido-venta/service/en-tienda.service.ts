import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { CrudService } from 'src/app/core/services/crud.service';
import { Observable } from 'rxjs';
import { EnTiendaResponse } from '../models/en-tienda-response.model';
import { EnTiendaRequest } from '../models/en-tienda-request.model';
import { PedidoMesaResponse } from '../../modulo-pedido/models/pedido-mesa-response.model';
import { PedidoResponse } from '../../pedido/models/pedido-response.model';


@Injectable({
  providedIn: 'root'
})
export class EnTiendaService extends CrudService<EnTiendaRequest, EnTiendaResponse> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.EnTienda)
  }

  ListaMesaPedido(finalizado: boolean | null): Observable<PedidoMesaResponse[]> {
    let url = `${this.url_service}pedido-mesa`;

    // Si el parámetro 'finalizado' no es nulo, agregar el query param
    if (finalizado !== null) {
      url += `?finalizado=${finalizado}`;
    }

    return this._http.get<PedidoMesaResponse[]>(url);
  }


  finalizarPedido(id: number): Observable<EnTiendaResponse> {
    return this._http.patch<EnTiendaResponse>(`${this.url_service}${id}/finalizar`, {});
  }

  getAllFinalizado(): Observable<EnTiendaResponse[]> {
    return this._http.get<EnTiendaResponse[]>(`${this.url_service}pedido-finalizado`);
  }
}
