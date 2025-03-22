import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoRegisterDetailsComponent } from './component/pedido-register-details/pedido-register-details.component';
import { PedidoPedidoListComponent } from './component/pedido-pedido-list/pedido-pedido-list.component';
import { PedidoPedidoMultipleComponent } from './component/pedido-pedido-multiple/pedido-pedido-multiple.component';

import { sharedClienteModule } from '../shared/sharedCliente.module';
import { FormsModule } from '@angular/forms';
import { PedidoRegisterCustomerComponent } from './component/pedido-register-customer/pedido-register-customer.component';
import { PedidoRegisterCheckoutComponent } from './component/pedido-register-checkout/pedido-register-checkout.component';
import { ClienteModule } from '../cliente/cliente.module';



@NgModule({
  declarations: [
    PedidoRegisterDetailsComponent,
    PedidoPedidoListComponent,
    PedidoPedidoMultipleComponent,
    PedidoRegisterCustomerComponent,
    PedidoRegisterCheckoutComponent,
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    sharedClienteModule,


    FormsModule,

    ClienteModule


  ]
})
export class PedidoModule { }
