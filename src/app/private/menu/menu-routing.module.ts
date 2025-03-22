
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*
import { MantCargoListComponent } from './component/cargo/mant-cargo-list/mant-cargo-list.component';
import { MantOrigenListComponent } from './component/origen/mant-origen-list/mant-origen-list.component';
import { MantCargoMultipleComponent } from './component/cargo/mant-cargo-multiple/mant-cargo-multiple.component';
import { MantDocumentoListComponent } from './component/documento/mant-documento-list/mant-documento-list.component';
*/

import { MenuCategoriaListComponent } from './component/categoria/menu-categoria-list/menu-categoria-list.component';
import { MenuproductoListComponent } from './component/producto/menu-producto-list/menu-producto-list.component';
const routes: Routes = [

  {
    path: 'categoria', component: MenuCategoriaListComponent
  },

  {
    path: 'producto', component: MenuproductoListComponent
  },

  /*{
    path: 'cliente', component: MantOrigenListComponent
  },*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
