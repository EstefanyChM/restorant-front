import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { PedidoRequest } from '../models/pedido-request.model';
import { PedidoResponse } from '../models/pedido-response.model';
import { CrudService } from 'src/app/core/services/crud.service';
import { Observable } from 'rxjs';
import { DetallePedidoResponse } from '../models/detalle-pedido-response.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<PedidoRequest, PedidoResponse> {

  constructor(protected http: HttpClient) {
    super(http, urlConstants.Pedido)
  }
  getAllCocina(PreparacionFinalizada: boolean): Observable<PedidoResponse[]> {
    const params = new HttpParams().set('PreparacionFinalizada', PreparacionFinalizada.toString());
    return this._http.get<PedidoResponse[]>(`${this.url_service}cocina`, { params });
  }

  detallePedidoFinalizado(idDetallePedio : number): Observable<DetallePedidoResponse> {
    return this._http.put<DetallePedidoResponse>(`${this.url_service}dp-preparacion/${idDetallePedio}`,{});
  }
}
