import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPedidosComponent } from './component/list-pedidos/list-pedidos.component';
import { ListPedidosHechosComponent } from './component/list-pedidos-hechos/list-pedidos-hechos.component';

const routes: Routes = [
  {path:'pedidos-pendientes', component: ListPedidosComponent},
  {path:'pedidos-finalizados', component: ListPedidosHechosComponent},
  { path: '', redirectTo: '/pedidos-pendientes', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloCocinaRoutingModule { }
