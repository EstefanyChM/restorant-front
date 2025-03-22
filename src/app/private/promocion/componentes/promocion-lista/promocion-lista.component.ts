import { Component, OnInit, TemplateRef } from '@angular/core';
import { PromocionService } from '../../service/promocion.service';
import { PromocionResponse } from '../../models/promocion-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/core/models/generic-filter-response.model';

//* socket */
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { eliminar_registro } from 'src/app/shared/functions/alerts';
import { alert_error, alert_success } from 'src/app/shared/functions/general.functions';


@Component({
  selector: 'app-promocion-lista',
  templateUrl: './promocion-lista.component.html',
  styleUrls: ['./promocion-lista.component.scss']
})


export class PromocionListaComponent implements OnInit {

  modalRef?: BsModalRef;
  promociones: PromocionResponse[] = [];
  promocionSelected: PromocionResponse = new PromocionResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup;
  request: GenericFilterRequest = new GenericFilterRequest();
  displayModal: boolean = false;

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
    private _promocionService: PromocionService ,
    private modalService: BsModalService,
    private websocketService: WebsocketService // Inyecta el servicio de WebSocket
  ) {
    // Formulario para el filtro de promociones
    this.myFormFilter = this.fb.group({
      id: ["", []],
      nombre: ["", []],
      disponibilidad: ["", []],
      estado: ["", []],
    });
  }

  ngOnInit(): void {
    this.listar();

    this.myFormFilter.valueChanges.subscribe(() => {
      this.listar();
    });

    // Escuchar evento desde el servidor para eliminar el registro en la vista
    this.websocketService.listen('registroEliminado').subscribe((id) => {
      const promocionId = id as number;
      this.promociones = this.promociones.filter(promocion => promocion.id !== promocionId);
    });

    this.websocketService.listen('restaurarRegistro').subscribe((jsonPromocion) => {
      this.promociones.unshift(jsonPromocion as any);
    });
  }



  listar() {

    this._promocionService.getAll().subscribe({
      next: (data : PromocionResponse[]) => {
        this.promociones = data;

      },
      error: () => {
        console.log("Error al filtrar promociones");
      },
      complete: () => {
        console.log("Filtrado completado");
      },
    });
  }

  async eliminar (promocion: PromocionResponse) {
    const result = await eliminar_registro(promocion.nombre, 'eliminar'); // Espera a que se resuelva la promesa
    if (result) {
      this._promocionService.delete(promocion.id).subscribe({
        next: () => {
          alert_success( 'Eliminado exitoso' , `la promoción ${promocion.nombre} se ha eliminado`);
          this.listar();
        },
        error: () => {
          //alert_error(promocion.estado?'Eliminado fallido':'Restauración fallida', `${promocion.nombre} no se ha podido ${promocion.estado?'eliminado':'restaurado'}`)
        }
      });
    }
  }

  crearPromocion(template: TemplateRef<any>) {
    this.promocionSelected = new PromocionResponse();
    this.titleModal = "NUEVA PROMOCIÓN";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }

  editarPromocion(template: TemplateRef<any>, promocion: PromocionResponse) {
    this.promocionSelected = promocion;
    this.titleModal = "EDITAR PROMOCIÓN";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }

  enviarALosSuscriptoresViaEmail(promocion : PromocionResponse){
    this._promocionService.enviarALosSuscriptoresViaEmail(promocion.id).subscribe({
      next: () => {alert_success('Envío masivo',`La promoción ${promocion.nombre} se ha enviado de manera masiva por email a los subscriptores`)},
      error: () => {},
      complete:() => {}
    });





  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listar();
    }
  }
}
