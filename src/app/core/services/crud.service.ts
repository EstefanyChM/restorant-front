import { Inject, Injectable } from '@angular/core';
import { CrudInterface } from '../interfaces/crud-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**TODO: IMPLEMENTA TODOS LOS METODOS RELACIONADOS AL CRUD
 *
 * T ==> REQUEST
 * Y ==> RESPONSE
 *
*/


export class CrudService<T, Y> implements CrudInterface<T, Y> {

  private cachedList: Y[] = [];

  constructor(
    protected _http: HttpClient,
    @Inject('url_service') public url_service: string
  ) { }

  /**TODO: Obtiene la lista de toda la tabla */
  getAll(): Observable<Y[]> {
    return this._http.get<Y[]>(this.url_service);
  }

  /**TODO: Obtiene la lista de  tabla, pero con estado true */
  getAllActive(): Observable<Y[]> {
    if(this.cachedList.length > 0) {
      // Si ya tenemos datos cacheados, devolvemos los cacheados
      return of(this.cachedList);
    } else {
    return this._http.get<Y[]>(this.url_service + "Active");
    }
  }

  /**TODO: Inserta un registro */
  create(request: T): Observable<Y> {
    return this._http.post<Y>(this.url_service, request);
  }
  /**TODO: Actualiza un registro */
  update(request: T): Observable<Y> {
    //console.log(`entonces a editar -- ${request}`);
    console.log(this.url_service);

    return this._http.put<Y>(this.url_service, request);
  }


  /** CAMBIAR DE ACTIVO A INACTIVO, PSUDOELIMINAR */
  /*  ocultar(id: number, request: Partial<T>): Observable<Y> {
    console.log(`quiero hacer un patch`);

    const url = `${this.url_service}${id}`;
    console.log(url);

      return this._http.patch<Y>(url, request);
  } */


  ocultar(id: number, patchDocument: any): Observable<Y> {
    //console.log(`quiero hacer un patch asdraaa`);

    const url = `${this.url_service}${id}/status`;
    //console.log(url);

    return this._http.patch<Y>(url, patchDocument);
  }

  /**TODO: Elimina un registro */
  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url_service}${id}`);
  }

  /**TODO: Elimina un registro */
  logicDelete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url_service}${id}/status`);
  }

  /**TODO: FILTRO GENERICO */
  genericFilter(request: GenericFilterRequest): Observable<GenericFilterResponse<Y>> {
    return this._http.post<GenericFilterResponse<Y>>(`${this.url_service}filter`, request);
  }

  /** Nuevo método: Obtiene un registro por su ID */
  getById(id: number): Observable<Y> {
    const url = `${this.url_service}${id}`;
    return this._http.get<Y>(url);
  }

}
