import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteRequest } from '../../../models/cliente-request.model';
import { ClienteResponse } from '../../../models/cliente-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ClienteService } from '../../../service/cliente.service';


@Component({
  selector: 'app-cli-cliente-list',
  templateUrl: './cli-cliente-list.component.html',
  styleUrls: ['./cli-cliente-list.component.scss']
})
export class CliClienteListComponent implements OnInit {

  modalRef?: BsModalRef;
  clientes: ClienteResponse[] = [];
  //productoSelected: productoResponse = new productoResponse();
  //titleModal: string = "";
  //accionModal: number = 0;
  myFormFilter: FormGroup;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    //private modalService: BsModalService,
    private _clienteService: ClienteService,
  ) {
    this.myFormFilter = this.fb.group({
      id: ["",[]],
      nombre: ["",[]],
      apellidos: ["",[]],
      numeroDocumento: ["",[]],
    });
  }

  ngOnInit(): void {
    this.filtrar();
  }

  listarproductos() {
    this._clienteService.getAll().subscribe({
      next: (data: ClienteResponse[]) => {
        this.clientes = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        // Realizar alguna acción cuando se complete la obtención de productos
      },
    });
  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");
    if (result) {
      this._clienteService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado correctamente");
        },
        error: () => {
          alert("Ocurrió un error al eliminar el registro");
        },
        complete: () => {
          this.listarproductos();
        }
      });
    }
  }

  eliminadoLogico(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");
    if (result) {
      this._clienteService.logicDelete(id).subscribe({
        next: () => {
          alert("Registro eliminado de forma correcta");
          this.filtrar(); // Actualizar la lista localmente
        },
        error: () => {
          alert("Hubo un error al eliminar el registro");
        }
      });
    }
  }

  filtrar() {
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros = [];

    this.request.filtros.push({ name: "id", value: valueForm.id });
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre });
    this.request.filtros.push({ name: "apellidos", value: valueForm.apellidos });
    this.request.filtros.push({ name: "numeroDocumento", value: valueForm.disponibilidad });

    //console.log(`filtros --> ${this.request.filtros.map(filtro => filtro.value)}`);
    if (this.request.filtros[1].value == "") this.request.filtros[1].value = "true";
    this._clienteService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<ClienteResponse>) => {
        console.log( 'recibo -->>' , data);

        this.clientes = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error: () => {
        console.log("Error al filtrar productos");
      },
      complete: () => {
        console.log("Filtrado completado");
      },
    });
  }

  clearBox(): void {
    // Restablecer los valores del formulario a cadenas vacías
    this.myFormFilter.reset({
      id: '',
      nombre: '',
      apellidos:  '',
      numeroDocumento: ''
    });
    this.filtrar();
  }

  changePage(event: PageChangedEvent) {
    this.request.numeroPagina = event.page;
    this.filtrar();
  }

  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }
}
