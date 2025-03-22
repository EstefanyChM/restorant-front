import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuMenuOrderComponent } from './menu-menu-order/menu-menu-order.component';
import { MenuMenuProductsComponent } from './menu-menu-products/menu-menu-products.component';


const routes: Routes = [
  /*{
    path: '', component: MenuMenuPageComponent
  },*/
  {
    path: ':categoriaNombre', component: MenuMenuProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
