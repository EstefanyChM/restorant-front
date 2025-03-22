
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductoService } from 'src/app/private/menu/service/producto.service';

import { productoResponse } from 'src/app/private/menu/models/producto-response.model';
import { productoForm } from 'src/app/private/menu/models/producto-form.model';
import { CarritoService } from 'src/app/private/menu/service/carrito.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromocionResponse } from 'src/app/private/promocion/models/promocion-response.model';

@Component({
  selector: 'app-promotion-discount-order',
  templateUrl: './promotion-discount-order.component.html',
  styleUrl: './promotion-discount-order.component.scss'
})
export class PromotionDiscountOrderComponent implements OnInit {
  modalRef?: BsModalRef;
  titleModal: string = "";
  //providers: [MessageService]

  @Input() title: string = "";
  @Input() promocion: PromocionResponse = new PromocionResponse();

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
      //cantidad: [1, [Validators.required, Validators.min(1), Validators.max(this.producto.stock)]]
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(20)]]

    });
  }


  updateTotal(cantidad: number): void {
    this.total = Math.min(cantidad, this.promocion.stock) * (this.promocion.total || 0);
  }



  agregarACarrito( promocion: PromocionResponse, cantidad: number): void {
    if (!isNaN(cantidad)) {
      this.productoEnvio = {
        id: promocion.id,
        nombre: promocion.nombre,
        urlImagen: promocion.urlImagen,
        descripcion: promocion.descripcion,
        precio: promocion.total,
        categoria: 'esPromocionDeDescuento',
        cantidad: cantidad,
        stockDelProducto: promocion.stock,
        esPromocion: true
      };
      this._carritoService.agregarAlCarrito(this.productoEnvio);


      this.notify.emit({ severity: 'success', summary: 'Éxito', detail: `${promocion.nombre} ha sido agregado al carrito.` });
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
