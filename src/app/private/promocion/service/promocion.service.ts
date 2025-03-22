import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { PromocionResponse } from '../models/promocion-response.model';
import { PromocionRequest } from '../models/promocion-request.model';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionService extends CrudService<PromocionRequest, PromocionResponse> {

  constructor( protected http: HttpClient,)
  {
    super(http, urlConstants.Promocion);
  }

  createWithFormData(formData: FormData): Observable<PromocionResponse> {
    return this.http.post<PromocionResponse>(this.url_service, formData);
  }

  updateWithFormData(id:number, formData: FormData): Observable<PromocionResponse> {
    return this.http.put<PromocionResponse>(`${this.url_service}${id}`, formData);
  }

  getPromocionByName(NombrePromocion: string): Observable<number> {
    return this.http.get<number>(`${this.url_service}NombrePromocion/${NombrePromocion}`);
  }

  enviarALosSuscriptoresViaEmail(idPromocion:number): Observable<PromocionResponse> {
    return this._http.post<PromocionResponse>(`${this.url_service}${idPromocion}/enviar-masivos`,{});
  }
  subirImagenPromo(idPromocion:number, foto:FormData): Observable<PromocionResponse> {
    return this._http.post<PromocionResponse>(`${this.url_service}subir-imagen/${idPromocion}`,foto);
  }
}


//[HttpPost("enviar-masivos")]
