import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Delivery } from 'src/app/private/colecciones/models/delivery.model';
import { Pickup } from 'src/app/private/colecciones/models/pickup.model';
import { PedidoRequest } from 'src/app/private/pedido/models/pedido-request.model';
import { DeliveryService } from 'src/app/private/pedido/service/delivery.service';
import { PickupService } from 'src/app/private/pedido/service/pickup.service';

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.scss'
})
export class FormServiceComponent {

  selectedServiceType: string = 'delivery';

  get costoDelivery(): number {
    return this.selectedServiceType === 'delivery' ? 5 : 0;
  }

  selectedStore: string = '';
  pickupTime: Date | null = null;
  idpedidoRecibido: number = 0;


  tiendasOptions: any[] = [
    { label: 'Riccos - único', value: 1 }
  ];

  serDeliveryForm: FormGroup;
  serRecojoTiendaForm: FormGroup;


  tiposDocumento = [
    { label: 'DNI', value: '1' },
    { label: 'Pasaporte', value: '2' },
    { label: 'Carné de Extranjería', value: '3' }
  ];

  constructor(
    private fb: FormBuilder,
    private _deliveryService: DeliveryService,
    private _pickupService: PickupService,
  ) {
    this.serDeliveryForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5)]],
      reference: ['', [Validators.minLength(3)]],
    });

    this.serRecojoTiendaForm = this.fb.group({
      PickupTime: ['', Validators.required],
    });
  }

  deliveryEnvio: Delivery = new Delivery();
  pickupEnvio: Pickup = new Pickup();

  guardarServicio(idPedido: number) {
    this.deliveryEnvio = this.serDeliveryForm.getRawValue();
    this.pickupEnvio = this.serRecojoTiendaForm.getRawValue();

    switch (this.selectedServiceType) {
      case 'delivery':
        //this.clienteEnvio.idPersonaNatural = this.personaResponse?.idPersonaNatural;
        this.deliveryEnvio.id = 0;
        this.deliveryEnvio.idPedido = idPedido
        this.deliveryEnvio.idPedidoNavigation = new PedidoRequest();
        console.log('servicio del: ', this.deliveryEnvio);

        this._deliveryService.create(this.deliveryEnvio).subscribe({
          next: (data: Delivery) => {
          },
          error: () => {
            alert("Ocurrio un error en pick up");
          },
          complete: () => { }
        });
        break;

      case 'pickup':
        this.pickupEnvio.idPedido = this.idpedidoRecibido
        this.pickupEnvio.id = 0;
        this.pickupEnvio.idPedidoNavigation = new PedidoRequest();
        //console.log('tons', this.clienteJuridicoEnvio);
        console.log('servicio pic: ', this.pickupEnvio);
        this._pickupService.create(this.pickupEnvio).subscribe({
          next: (data: Pickup) => {
          },
          error: () => {
            alert("no has implementado recojo en tienda, doooh");

          },
          complete: () => {
            console.log("El proceso ha finalizado"); // Útil para saber que el flujo ha terminado
          }
        });
        break;
      default:
        break;
    }
  }
}
