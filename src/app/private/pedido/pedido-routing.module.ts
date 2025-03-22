import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoListaComponent } from './components/pedido-lista/pedido-lista.component';
import { PedidoListGraphsComponent } from './components/pedido-list-graphs/pedido-list-graphs.component';

const routes: Routes = [
  {path:'lista', component: PedidoListaComponent},
  {path:'graficos', component: PedidoListGraphsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
