import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../service/pedido.service';
import { PedidoResponse } from '../../models/pedido-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';

import { SelectItem, SortEvent } from 'primeng/api';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { eliminar_registro } from 'src/app/shared/functions/alerts';



@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrl: './pedido-lista.component.scss'
})
export class PedidoListaComponent implements OnInit {

  modalRef?: BsModalRef;
  pedidos: PedidoResponse[] = [];
  pedidoSelected: PedidoResponse = new PedidoResponse();
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


  constructor(
    private fb: FormBuilder,
    private _pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    this.filtrar();
  }

  abrirDetalles(pedido: any) {
    this.pedidoSelected = pedido;
    this.detallesDialogoVisible = true;
  }

  estadoDelPedido: boolean = false;

  filtrar() {
    this.request.numeroPagina = this.currentPage;
    this.request.cantidad = this.itemsPerPage;

    console.log('1.- ', this.request.filtros);

    this._pedidoService.genericFilter(this.request).subscribe({
        next: (data: GenericFilterResponse<PedidoResponse>) => {
            console.log('recibo -->>', data);
            this.loading = false;
            this.pedidos = data.lista;
            this.totalItems = data.totalRegistros;
        },
        error: () => { },
        complete: () => { },
    });
}

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

