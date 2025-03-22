import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { productoResponse } from '../models/producto-response.model';
import { productoRequest } from '../models/producto-request.model';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends CrudService<productoRequest, productoResponse> {

  constructor(protected http: HttpClient,) {
    super(http, urlConstants.producto);
  }

  createWithFormData(formData: FormData): Observable<productoResponse> {
    //formData.forEach((value, key) => {
    //  console.log(`${key}:`, value);
    //});

    return this.http.post<productoResponse>(this.url_service, formData);
  }

  updateWithFormData(id: number, formData: FormData): Observable<productoResponse> {
    //formData.forEach((value, key) => {
    //  console.log(`${key}:`, value);
    //});
    return this.http.put<productoResponse>(`${this.url_service}${id}`, formData);
  }


  rangoPrecios(): Observable<any> {
    return this._http.get<any>(`${this.url_service}rangoPrecios`);
  }

  getAllWithParameters(activo?: boolean, disponible?: boolean, idCategoria?: number): Observable<productoResponse[]> {
    let params = new HttpParams();

    if (activo !== undefined) {
      params = params.set('activo', activo.toString());
    }

    if (disponible !== undefined) {
      params = params.set('disponible', disponible.toString());
    }

    if (idCategoria !== undefined) {
      params = params.set('idCategoria', idCategoria.toString());
    }

    return this._http.get<productoResponse[]>(this.url_service, { params });
  }


}
