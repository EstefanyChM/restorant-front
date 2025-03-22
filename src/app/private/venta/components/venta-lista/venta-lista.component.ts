import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../../service/venta.service';
import { VentaResponse } from 'src/app/private/modulo-pedido-venta/models/venta-response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';

import { SelectItem } from 'primeng/api';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-venta-lista',
  templateUrl: './venta-lista.component.html',
  styleUrl: './venta-lista.component.scss'
})



export class VentaListaComponent implements OnInit {

  modalRef?: BsModalRef;
  ventas: VentaResponse[] = [];
  ventaSelected: VentaResponse = new VentaResponse();
  titleModal: string = "";
  accionModal: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 8;
  currentPage: number = 1;
  detallesDialogoVisible: boolean = false;

  request: GenericFilterRequest = new GenericFilterRequest();
  selectedList: SelectItem = { value: '' };


  finalizadoOptions: any[] = [
    { label: 'Finalizado', value: true },
    { label: 'No Finalizado', value: false },
  ];

  ventaFinalizadaOptions: any[] = [
    { label: 'Finalizado', value: true },
    { label: 'No Finalizado', value: false },
  ];


  servicioOptions: any[] = [
    { label: 'Físico', value: 1 },
    { label: 'Delivery', value: 2 },
    { label: 'Recojo en Tienda', value: 3 },
  ];

  metodoPagoOptions: any[] = [
    { label: 'Efectivo', value: 1 },
    { label: 'Mercado Pago', value: 7 },
  ];


  constructor(
    private fb: FormBuilder,
    private _ventaService: VentaService,
  ) {}

  ngOnInit(): void {
    this.filtrar();
  }


  estadoDelPedido: boolean = false;

  filtrar() {
    this.request.numeroPagina = this.currentPage;
    this.request.cantidad = this.itemsPerPage;

    console.log('1.- ', this.request.filtros);

    this._ventaService.genericFilter(this.request).subscribe({
        next: (data: GenericFilterResponse<VentaResponse>) => {
            console.log('recibo -->>', data);
            this.loading = false;
            this.ventas = data.lista;
            this.totalItems = data.totalRegistros;
        },
        error: () => { },
        complete: () => { },
    });
}

fechaVentaFilter: string | null = null; // Valor para el input de tipo fecha

  aplicarFiltro(valor: string | null, campo: string) {
    // Si el valor es null (cuando el usuario borra el filtro), eliminarlo de la lista de filtros
    if (valor === null) {
        this.request.filtros = this.request.filtros.filter(f => f.name !== campo);
    } else {
        // Si tiene valor, primero eliminar el filtro existente y luego agregar el nuevo
        this.request.filtros = this.request.filtros.filter(f => f.name !== campo);
        this.request.filtros.push({ name: campo, value: valor });
    }

    this.filtrar(); // Llama a la función de filtrado con los filtros actualizados
  }
borrarFiltros(){
  this.request.filtros = [];
  this.filtrar();

}


  changePage(event: any) {
    this.currentPage = event.page + 1;
    this.itemsPerPage = event.rows;
    this.filtrar();
  }

  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }


  /**************************************** */
  loading: boolean = true;



}

