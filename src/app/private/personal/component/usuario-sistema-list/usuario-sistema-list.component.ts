

import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalEmpresaService } from '../../service/personal-empresa.service';
import { PersonalEmpresaResponse } from '../../models/personal-empresa-response.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { eliminar_registro } from 'src/app/shared/functions/alerts';
import { Table } from 'primeng/table';
import { UsuarioSistemaService } from '../../service/usuario-sistema.service';

@Component({
  selector: 'app-usuario-sistema-list',
  templateUrl: './usuario-sistema-list.component.html',
  styleUrl: './usuario-sistema-list.component.scss'
})

export class UsuarioSistemaListComponent implements OnInit {

  personalEmpresa: PersonalEmpresaResponse[] = [];
  personalEmpresaSelected: PersonalEmpresaResponse = new PersonalEmpresaResponse();
  titleModal: string = "";
  accionModal: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 8;
  currentPage: number = 1;
  loading: boolean = true;
  personal: PersonalEmpresaResponse = new PersonalEmpresaResponse();

  rolOptions: any[] = [
    { label: 'Administrador', value:1},
    { label: 'Vendedor',value:2},
    { label: 'Mozo' ,value:3},
    { label: 'Ninguno' ,value:0},
  ];



  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioSistemaService : UsuarioSistemaService,
    private primengConfig: PrimeNGConfig
  ) {
    this.primengConfig.setTranslation({
      startsWith: 'Comienza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Es igual a',
      notEquals: 'No es igual a',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      is: 'Es',
      isNot: 'No es',
      before: 'Antes',
      after: 'Después',
      dateIs: 'La fecha es',
      dateIsNot: 'La fecha no es',
      dateBefore: 'Fecha antes de',
      dateAfter: 'Fecha después de',
      clear: 'Limpiar',
      apply: 'Aplicar'
    });

  }

  ngOnInit(): void {
    this.filtrar();
  }

  filtrar() {
    this._usuarioSistemaService.getAll().subscribe({
      next: (data: PersonalEmpresaResponse[]) => {
        this.loading = false;
        this.personalEmpresa = data;
      },
      error: () => { },
      complete: () => { },
    });
  }



  editarpersonalEmpresa(personal: PersonalEmpresaResponse) {
    this.personalEmpresaSelected = personal;
    this.titleModal = "EDITAR Personal";
    this.accionModal = AccionMantConst.editar;
  }

  async eliminar(personal: PersonalEmpresaResponse) {
    const result = await eliminar_registro(personal.nombre, 'eliminar');
    if (result) {
      this._usuarioSistemaService.delete(personal.id).subscribe({
        next: () => {
          alert_success('Eliminado exitoso', `${personal.nombre} ha sido eliminado`);
          this.filtrar();
        },
        error: (err) => { console.log(err); }
      });
    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  crearUsuarioSistema(personal: any) {
    this.personal = personal;  // Puedes usar el objeto `personal` para rellenar datos si lo necesitas
    this.displayRegisterUser = true;  // Muestra el modal
  }

  // Método para cancelar y cerrar el modal
  cancelar() {
    this.displayPersonal = false;
  }

  tipoComprobante: number = 0;

  agregarPersonal(){
    this.displayPersonal = true;
  }
  displayPersonal: boolean = false;
  displayRegisterUser: boolean = false;
  dialogPersonal() {
    this.displayRegisterUser = false;
  this.displayPersonal = false;
  this.filtrar();

  }


  //<input pInputText type="text" #filter (input)="onGlobalFilter(dt1, $event)" placeholder="Search Keyword" class="w-full" />
/************************************** */

}
