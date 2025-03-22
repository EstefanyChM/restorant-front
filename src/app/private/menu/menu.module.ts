import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCategoriaListComponent } from './component/categoria/menu-categoria-list/menu-categoria-list.component';
import { MenuCategoriaRegisterComponent } from './component/categoria/menu-categoria-register/menu-categoria-register.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';

import { MenuProductoRegisterComponent } from './component/producto/menu-producto-register/menu-producto-register.component';
import { MenuproductoListComponent } from './component/producto/menu-producto-list/menu-producto-list.component';


@NgModule({
  declarations: [
    MenuCategoriaListComponent,
    MenuCategoriaRegisterComponent,

    MenuProductoRegisterComponent,
    MenuproductoListComponent
  ],

  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
