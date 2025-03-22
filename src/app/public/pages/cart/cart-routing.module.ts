import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CartCheckoutPaymentComponent } from './checkout/cart-checkout-payment/cart-checkout-payment.component';
import { HorarioGuard } from './guards/horario.guard';
//import { CartModalComponent } from './cart-modal/cart-modal.component';

const routes: Routes = [
  /*{
    path: '', component: CartModalComponent
  },*/
  { path: 'checkout-payment',
    component: CartCheckoutPaymentComponent,
    //canActivate: [HorarioGuard],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
