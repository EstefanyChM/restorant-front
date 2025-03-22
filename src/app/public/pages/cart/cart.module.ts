import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { CartCheckoutPaymentComponent } from './checkout/cart-checkout-payment/cart-checkout-payment.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormComprobanteComponent } from './checkout/form-comprobante/form-comprobante.component';
import { FormServiceComponent } from './checkout/form-service/form-service.component';

@NgModule({
  declarations: [
    CartCheckoutPaymentComponent,
    CartModalComponent,
    FormComprobanteComponent,
    FormServiceComponent

  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    TabViewModule,
    DividerModule,
    AccordionModule,
    RadioButtonModule
  ],
  exports:[CartModalComponent]
})
export class CartModule { }
