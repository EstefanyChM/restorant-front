import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaVentaListComponent } from './components/venta-venta-list/venta-venta-list.component';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';

import { SharedModule } from 'src/app/shared/shared.module';

import { MessageService } from 'primeng/api';
import { ClienteModule } from '../cliente/cliente.module';
import { VentaTipoPagoComponent } from "./components/venta-tipo-pago/venta-tipo-pago.component";

import { StepperModule } from 'primeng/stepper';
import { VentaPickupListComponent } from './components/venta-pickup-list/venta-pickup-list.component';
import { VentaDeliveryListComponent } from './components/venta-delivery-list/venta-delivery-list.component';



@NgModule({
  declarations: [
    VentaVentaListComponent,
    VentaTipoPagoComponent,
    VentaPickupListComponent,
    VentaDeliveryListComponent

  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    ToastModule,
    StepsModule,
    SharedModule,
    ClienteModule,
    StepperModule
],
  providers: [MessageService],
})
export class VentaModule { }
