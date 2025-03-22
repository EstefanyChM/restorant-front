import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoriaService } from '../../../service/categoria.service';
import { CategoriaResponse } from '../../../models/categoria-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';

//* socket */
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { eliminar_registro } from 'src/app/shared/functions/alerts';
import { alert_error, alert_success } from 'src/app/shared/functions/general.functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-categoria-list',
  templateUrl: './menu-categoria-list.component.html',
  styleUrls: ['./menu-categoria-list.component.scss']
})
export class MenuCategoriaListComponent implements OnInit {

  modalRef?: BsModalRef;
  categorias: CategoriaResponse[] = [];
  categoriaSelected: CategoriaResponse = new CategoriaResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup;
  request: GenericFilterRequest = new GenericFilterRequest();
  displayModal: boolean = false;
  itemsPerPage: number = 50; // Número de ítems por página


  estadoOptions: any[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
    { label: 'Todos', value: ""  }
  ];

  disponibilidadOptions: any[] = [
    { label: 'Disponible', value: true },
    { label: 'No Disponible', value: false },
    { label: 'Todos', value: ""  }
  ];

  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private modalService: BsModalService,
    private websocketService: WebsocketService ,// Inyecta el servicio de WebSocket
    private router: Router
  ) {
    // Formulario para el filtro de categorías
    this.myFormFilter = this.fb.group({
      id: ["", []],
      nombre: ["", []],
      disponibilidad: ["", []],
      estado: ["", []],
    });
  }

  ngOnInit(): void {
    this.filtrar();

    this.myFormFilter.valueChanges.subscribe(() => {
      this.filtrar();
    });

    // Escuchar evento desde el servidor para eliminar el registro en la vista
    this.websocketService.listen('registroEliminado').subscribe((id) => {
      const categoriaId = id as number;
      this.categorias = this.categorias.filter(categoria => categoria.id !== categoriaId);
    });

    this.websocketService.listen('restaurarRegistro').subscribe((jsonCat) => {
      //alert('restaurar' + (jsonCat as any).nombre);
      this.categorias.unshift(jsonCat as any);
    });
  }


  filtrar() {
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros = [];
    this.request.filtros.push({ name: "id", value: valueForm.id });
    this.request.filtros.push({ name: "estado", value: valueForm.estado });
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre });
    this.request.filtros.push({ name: "disponibilidad", value: valueForm.disponibilidad });

    this.request.cantidad = this.itemsPerPage;

    this._categoriaService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<CategoriaResponse>) => {
        this.categorias = data.lista;
      },
      error: () => {
        console.log("Error al filtrar categorías");
      },
      complete: () => {
        console.log("Filtrado completado");
      },
    });
  }

  async eliminadoLogico(categoria: CategoriaResponse) {
    const result = await eliminar_registro(categoria.nombre, categoria.estado? 'eliminar':'restaurar'); // Espera a que se resuelva la promesa
    if (result) {
        this._categoriaService.logicDelete(categoria.id).subscribe({
            next: () => {
                if (!categoria.estado) {
                    this.websocketService.emit('restaurar-registro', categoria);
                } else {
                    this.websocketService.emit('eliminar-registro', categoria.id);
                }
                alert_success(categoria.estado?'Eliminado exitoso':'Restauración exitosa', `${categoria.nombre} se ha ${categoria.estado?'eliminado':'restaurado'}`)
                this.filtrar();
            },
            error: () => {
                alert_error(categoria.estado?'Eliminado fallido':'Restauración fallida', `${categoria.nombre} no se ha podido ${categoria.estado?'eliminado':'restaurado'}`)
            }
        });
    }
}



  crearCategoria(template: TemplateRef<any>) {
    this.categoriaSelected = new CategoriaResponse();
    this.titleModal = "NUEVA CATEGORÍA";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }

  editarCategoria(template: TemplateRef<any>, categoria: CategoriaResponse) {
    this.categoriaSelected = categoria;
    this.titleModal = `EDITAR ${this.categoriaSelected.nombre}` ;
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.filtrar();
    }
  }


}
