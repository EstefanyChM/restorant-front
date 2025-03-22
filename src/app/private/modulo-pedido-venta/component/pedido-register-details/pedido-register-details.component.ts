import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/private/menu/service/producto.service';
import { productoResponse } from 'src/app/private/menu/models/producto-response.model';

import { SharedClienteService } from 'src/app/private/shared/services/shared-cliente-service.service';
import { ClienteResponse } from 'src/app/private/cliente/models/cliente-response.model';
import { DetallePedidoRequest } from 'src/app/private/pedido/models/detalle-pedido.model';
import { PedidoRequest } from 'src/app/private/pedido/models/pedido-request.model';
import { PedidoService } from '../../../pedido/service/pedido.service';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';

import { Router, ActivatedRoute } from '@angular/router';
import { SharedPedidoService } from 'src/app/shared/services/shared-pedido.service';

@Component({
  selector: 'app-pedido-register-details',
  templateUrl: './pedido-register-details.component.html',
  styleUrls: ['./pedido-register-details.component.scss']
})
export class PedidoRegisterDetailsComponent implements OnInit {
  productosBack: productoResponse[] = [];
  filteredproductos: productoResponse[] = [];
  selectedproducto: productoResponse | null = null;
  showList: boolean = false;
  searchTerm: string = '';
  cantidad: number = 1;
  carrito: any[] = [];
  detallePedidoRequest: DetallePedidoRequest[] = [];

  clienteResponse: ClienteResponse | null = null;

  pedidoEnvio = new PedidoRequest();

  constructor(
    private productoService: ProductoService,
    private _sharedClienteService: SharedClienteService,
    private _pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedPedidoService: SharedPedidoService
  ) {}

  ngOnInit(): void {
    this.cargarproductos();

    this._sharedClienteService.clienteResponse$.subscribe((response) => {
      this.clienteResponse = response;
      console.log('ClienteResponse en PedidoPedidoRegisterComponent:', this.clienteResponse);
    });
  }

  cargarproductos(): void {
    this.productoService.getAll().subscribe({
      next: (data: productoResponse[]) => {
        this.productosBack = data;
        this.filteredproductos = data;

        if (this.productosBack.length > 0) {
          this.selectedproducto = this.productosBack[0];
        }
      },
      error: (error) => {
        console.error('Error al cargar las productos:', error);
      },
      complete: () => {
        console.log('Carga de productos completada.');
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Tipo seguro
    this.searchTerm = input.value; // Obtener el valor del input
    this.filteredproductos = this.productosBack.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  selectproducto(producto: productoResponse): void {
    this.selectedproducto = producto;
    this.searchTerm = producto.nombre;
    this.showList = false;
    console.log('producto seleccionado: ', this.selectedproducto);
  }

  hideList(): void {
    setTimeout(() => {
      this.showList = false;
    }, 200); // Retraso para permitir que el mousedown del li se registre antes de ocultar la lista
  }

  calcularTotal(): string {
    if (this.selectedproducto && this.cantidad) {
      const precio = this.selectedproducto.precio || 0;
      const total = this.cantidad * precio;
      return total.toFixed(2);
    }
    return '0.00';
  }

  agregarALista(): void {
    if (this.selectedproducto && this.cantidad > 0) {
      const item = {
        id: this.selectedproducto.id,
        nombre: this.selectedproducto.nombre,
        precio: this.selectedproducto.precio,
        cantidad: this.cantidad,
        total: this.calcularTotal()
      };
      this.carrito.push(item);
      this.selectedproducto = null;
      this.cantidad = 1;

      console.log(item.id, '-', item.cantidad);
    }
  }

  eliminarDelCarrito(index: number): void {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
    }
  }

  calcularPrecioTotal(): string {
    let precioTotal = 0;
    this.carrito.forEach((item) => {
      precioTotal += parseFloat(item.total);
    });
    return precioTotal.toFixed(2);
  }

  hacerPedido(): void {
    this.detallePedidoRequest = this.carrito.map((item) => {
      return new DetallePedidoRequest(0, item.cantidad, item.id, 0,0,0);
    });

    this.pedidoEnvio.detallePedidosRequest = this.detallePedidoRequest;
    this._pedidoService.create(this.pedidoEnvio).subscribe({
      next: (data: PedidoResponse) => {
        this.sharedPedidoService.setPedido(data.id);
        alert('Se hizo el pedido');
        console.log('el pedido que se RECIBE, ahora me voy: ', data);
        this.router.navigate(['../pedido-checkout'], { relativeTo: this.route });
      },
      error: () => {
        alert('hay un errorsaaazo, un errorsazo hay');
      }
    });
  }
}
