
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductoService } from 'src/app/private/menu/service/producto.service';

import { productoResponse } from 'src/app/private/menu/models/producto-response.model';
import { productoForm } from 'src/app/private/menu/models/producto-form.model';
import { CarritoService } from 'src/app/private/menu/service/carrito.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-menu-menu-order',
  templateUrl: './menu-menu-order.component.html',
  styleUrls: ['./menu-menu-order.component.scss']
})
export class MenuMenuOrderComponent implements OnInit {
  modalRef?: BsModalRef;
  titleModal: string = "";
  //providers: [MessageService]

  @Input() title: string = "";
  @Input() producto: productoResponse = new productoResponse();

  @Output() closeModalEmmit = new EventEmitter<boolean>();
  @Output() notify: EventEmitter<any> = new EventEmitter(); // Emite un evento

  productoEnvio: productoForm = new productoForm();
  total: number = 0;
  orderForm!: FormGroup;


  constructor(
    private _productoService: ProductoService,
    private _carritoService: CarritoService, private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(this.producto.stock)]]
    });
  }


  updateTotal(cantidad: number): void {
    this.total = Math.min(cantidad, this.producto.stock) * (this.producto.precio || 0);
  }



  agregarACarrito( producto: productoResponse, cantidad: number): void {
    if (!isNaN(cantidad)) {
      this.productoEnvio = {
        id: producto.id,
        nombre: producto.nombre,
        urlImagen: producto.urlImagen,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoriaNombre,
        cantidad: cantidad,
        stockDelProducto: producto.stock,
        esPromocion:false
      };
      this._carritoService.agregarAlCarrito(this.productoEnvio);


      this.notify.emit({ severity: 'success', summary: 'Éxito', detail: `${producto.nombre} ha sido agregado al carrito.` });
    } else {
      console.error('La cantidad ingresada no es un número válido');
      this.notify.emit({ severity: 'error', summary: 'Error', detail: 'La cantidad ingresada no es un número válido.' });
    }

    this.cerrarModal(true);
  }

  cerrarModal(res: boolean): void {
    this.closeModalEmmit.emit(res);
  }
}
