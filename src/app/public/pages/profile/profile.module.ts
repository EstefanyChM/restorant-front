import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { DatosComponent } from './components/datos/datos.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DatosComponent,
    DireccionesComponent,
    FavoritosComponent,
    PedidosComponent

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
