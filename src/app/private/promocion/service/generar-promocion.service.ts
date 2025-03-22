import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoSeleccionado } from 'src/app/shared/models/producto-seleccionado';

@Injectable({
  providedIn: 'root'
})
export class GenerarPromocionService {
  private apiUrl = 'https://ia-promo.onrender.com';
  //private apiUrl = 'http://192.168.100.115:5000';



  constructor(private http: HttpClient) {}


  obtenerListaProductos(cantidad: number): Observable<any> {
    const params = new HttpParams().set('cantidad', cantidad.toString());
    return this.http.get<any>(`${this.apiUrl}/lista-productos`,{params});
  }

  obtenerProductoPorIdCategoria(idCategoria: number): Observable<any> {
    const params = new HttpParams().set('idCategoria', idCategoria.toString());
    return this.http.get<any>(`${this.apiUrl}/producto-descuento`,{params});
  }

  obtenerDescripcion(productosAProcesar: ProductoSeleccionado[]): Observable<any> {
    const params = new HttpParams().set('productos', JSON.stringify(productosAProcesar));
    return this.http.get<any>(`${this.apiUrl}/obtener_descripcion`,{params});
  }

}
