import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaVentaListComponent } from './components/venta-venta-list/venta-venta-list.component';
import { VentaDeliveryListComponent } from './components/venta-delivery-list/venta-delivery-list.component';
import { VentaPickupListComponent } from './components/venta-pickup-list/venta-pickup-list.component';

const routes: Routes = [
  {path:'lista-venta', component: VentaVentaListComponent},
  {path:'lista-delivery', component: VentaDeliveryListComponent},
  {path: 'lista-pickup', component: VentaPickupListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
