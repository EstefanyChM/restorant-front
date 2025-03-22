import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MercadoPagoRoutingModule } from './mercado-pago-routing.module';
import { SuccessComponent } from './components/success/success.component';



@NgModule({
  declarations: [SuccessComponent],
  imports: [
    CommonModule,
    MercadoPagoRoutingModule,
  ]
})
export class MercadoPagoModule { }
