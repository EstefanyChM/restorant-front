import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/core/constants/url.constants';
import { CategoriaResponse } from '../models/categoria-response.model';
import { CategoriaRequest } from '../models/categoria-request.model';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<CategoriaRequest, CategoriaResponse> {

  constructor( protected http: HttpClient,)
  {
    super(http, urlConstants.categoria);
  }

  createWithFormData(formData: FormData): Observable<CategoriaResponse> {
    console.log(this.url_service);
    formData.forEach((value, key) => {
      console.log(key, value);
  });



    return this.http.post<CategoriaResponse>(this.url_service, formData);
  }

  updateWithFormData(id:number, formData: FormData): Observable<CategoriaResponse> {
    return this.http.put<CategoriaResponse>(`${this.url_service}${id}`, formData);
  }


  getCategoriaByName(NombreCategoria: string): Observable<number> {
    return this.http.get<number>(`${this.url_service}NombreCategoria/${NombreCategoria}`);
  }

  getAllWithParameters(activo?: boolean, disponible?: boolean): Observable<CategoriaResponse[]> {
    let params = new HttpParams();

    if (activo !== undefined) {
      params = params.set('activo', activo.toString());
    }

    if (disponible !== undefined) {
      params = params.set('disponible', disponible.toString());
    }

    return this._http.get<CategoriaResponse[]>(this.url_service, { params });
  }

}
