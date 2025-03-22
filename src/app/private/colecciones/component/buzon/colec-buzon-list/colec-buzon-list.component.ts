import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BuzonService } from '../../../service/buzon.service';
import { BuzonResponse } from '../../../models/buzon-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-colec-buzon-list',
  templateUrl: './colec-buzon-list.component.html',
  styleUrls: ['./colec-buzon-list.component.scss']
})
export class ColecBuzonListComponent implements OnInit {

  modalRef?: BsModalRef;
  buzones: BuzonResponse[] = [];
  buzonSelected: BuzonResponse = new BuzonResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup;
  totalItems: number = 0;
  itemsPerPage: number = 8;
  request: GenericFilterRequest = new GenericFilterRequest();

  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _buzonService: BuzonService,


  ) {
    //nuestro formulario buzon request
    this.myFormFilter = this.fb.group({
      nombre: ["", []],
      estado: ["", []],
    });
  }
  ngOnInit(): void {
    this.filtrar();
  }


  filtrar() {
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "asuntoNombre", value: valueForm.asuntoNombre });
    this.request.filtros.push({ name: "estado", value: valueForm.estado });
    this._buzonService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<BuzonResponse>) => {
        console.log("DATOS-->", data);
        this.buzones = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error: () => {
        console.log("error");
      },
      complete: () => {
        console.log("completo");
      },
    });
  }

  listarBuzones() {
    this._buzonService.getAll().subscribe({
      next: (data: BuzonResponse[]) => {
        this.buzones = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },
    });
  }

  crearBuzon(template: TemplateRef<any>) {
    this.buzonSelected = new BuzonResponse();
    this.titleModal = "NUEVO BUZON";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }

  responder(template: TemplateRef<any>, buzon: BuzonResponse) {
    this.buzonSelected = buzon;
    this.titleModal = "EDITAR BUZON";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarBuzones();
    }
  }

  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");
    if (result) {
      this._buzonService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarBuzones();
        }
      });
    }
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
