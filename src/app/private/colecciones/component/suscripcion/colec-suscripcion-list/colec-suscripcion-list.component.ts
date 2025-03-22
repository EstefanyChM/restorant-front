import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { SuscripcionService } from '../../../service/suscripcion.service';
import { SuscripcionResponse } from '../../../models/suscripcion-response.model';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { eliminar_registro } from 'src/app/shared/functions/alerts';
import { alert_success } from 'src/app/shared/functions/general.functions';

@Component({
  selector: 'app-colec-suscripcion-list',
  templateUrl: './colec-suscripcion-list.component.html',
  styleUrls: ['./colec-suscripcion-list.component.scss']
})
export class ColecSuscripcionListComponent implements OnInit {
  suscriptores: SuscripcionResponse[] = [];
  myFormFilter: FormGroup;
  request: GenericFilterRequest = new GenericFilterRequest();
  totalItems: number = 0;
  itemsPerPage: number = 8; // Número de ítems por página
  currentPage: number = 1; // Página actual

  estadoOptions: any[] = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ];

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private _subscriptorService: SuscripcionService,
    private fb: FormBuilder
  ) {
    this.myFormFilter = this.fb.group({
      nombre: [''],
      estado: ['']
    });
  }

  ngOnInit() {
    this.filtrar();
  }

  filtrar() {
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros = [
      { name: 'asuntoNombre', value: valueForm.nombre },
      { name: 'estado', value: valueForm.estado }
    ];
    this.request.numeroPagina = this.currentPage;
    this.request.cantidad = this.itemsPerPage;
    this._subscriptorService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<SuscripcionResponse>) => {
        this.suscriptores = data.lista;
        this.totalItems = data.totalRegistros;
        console.log(data);

      },
      error: () => {
        console.log('Error en la solicitud');
      },
      complete: () => {
        console.log('Solicitud completa');
      }
    });
  }

  changePage(event: any) {
    this.currentPage = event.page + 1; // NG Prime usa un índice basado en 0
    this.itemsPerPage = event.rows;
    this.filtrar();
  }

  changeItemsPerPage() {
    this.currentPage = 1; // Reiniciar a la primera página al cambiar los ítems por página
    this.filtrar();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  borrarFiltros(): void {
    this.myFormFilter.reset({
      nombre: '',
      estado: ''
    });
    this.filtrar();
  }

  editarSuscriptor(template: TemplateRef<any>, producto: SuscripcionResponse) {
    /*this.productoSelected = producto;
    this.titleModal = "EDITAR producto";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);*/
  }

  async eliminadoLogico(producto: SuscripcionResponse) {
    const result = await eliminar_registro(producto.email, producto.estado? 'eliminar':'restaurar'); // Espera a que se resuelva la promesa
    if (result) {
        this._subscriptorService.logicDelete(producto.id).subscribe({
            next: () => {
                alert_success (producto.estado?'Eliminado exitoso':'Restauración exitosa', `${producto.email} se ha ${producto.estado?'eliminado':'restaurado'}`)
                this.filtrar();
            },
            error: () => {
                //alert_error(categoria.estado?'Eliminado fallido':'Restauración fallida', `${categoria.nombre} no se ha podido ${categoria.estado?'eliminado':'restaurado'}`)
            }
        });
    }
}


}
