import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoListaComponent } from './components/pedido-lista/pedido-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PedidoListGraphsComponent } from './components/pedido-list-graphs/pedido-list-graphs.component';


@NgModule({
  declarations: [
    PedidoListaComponent,
    PedidoListGraphsComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    SharedModule
  ]
})
export class PedidoModule { }
