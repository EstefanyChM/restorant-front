import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeHomePageComponent } from './home/home.component';
import { MenuMenuProductsComponent } from '../menu/menu-menu-products/menu-menu-products.component';



const routes: Routes = [
  {path: '', component: HomeHomePageComponent},
  { path: 'productos/:categoriaId', component: MenuMenuProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
