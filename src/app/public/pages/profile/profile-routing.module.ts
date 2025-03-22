import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DatosComponent } from './components/datos/datos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { authClienteGuard } from 'src/app/auth/guard/authCliente.guard';

const routes: Routes = [
  {
    canActivate : [authClienteGuard],
    path: '',  component: ProfileComponent,
    children: [
      {
        path: '', component: DatosComponent },
      { path: 'pedidos', component: PedidosComponent },
      //{ path: 'favoritos', component: FavoritosComponent },
      { path: 'direcciones', component: DireccionesComponent },

    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
