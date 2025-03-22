import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PedidoPedidoListComponent } from './component/pedido-pedido-list/pedido-pedido-list.component';
import { PedidoRegisterDetailsComponent } from './component/pedido-register-details/pedido-register-details.component';
import { PedidoPedidoMultipleComponent } from './component/pedido-pedido-multiple/pedido-pedido-multiple.component';
import { PedidoRegisterCheckoutComponent } from './component/pedido-register-checkout/pedido-register-checkout.component';

const routes: Routes = [
  {
    path: 'nuevo-pedido', component: PedidoRegisterDetailsComponent
  },

  {
    path: 'pedido-checkout', component: PedidoRegisterCheckoutComponent  // Añade esta línea
  },
  {
    path: 'pedidos-pendientes', component: PedidoPedidoListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
