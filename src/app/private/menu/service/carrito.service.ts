import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { productoForm } from '../models/producto-form.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: productoForm[] = [];
  carritoActualizado = new Subject<productoForm[]>();

  constructor() {
    this.cargarCarritoDesdeLocalStorage();



  }

  agregarAlCarrito(item: productoForm): void {
    this.carrito.push(item);
    this.actualizarLocalStorage();
    this.carritoActualizado.next([...this.carrito]); // Emitir una copia del array actualizado
  }

  obtenerCarrito(): productoForm[] {
    return this.carrito;
  }

  actualizarCarrito(nuevoCarrito: productoForm[]): void {
    this.carrito = nuevoCarrito;
    this.actualizarLocalStorage();
    this.carritoActualizado.next(this.carrito);
  }

  private actualizarLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  private cargarCarritoDesdeLocalStorage(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      this.carritoActualizado.next([...this.carrito]); // Emitir el carrito cargado
      console.log('Carrito cargado desde LocalStorage:', this.carrito);
    }
  }
}
