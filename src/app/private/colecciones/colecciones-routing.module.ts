import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColecBuzonListComponent } from './component/buzon/colec-buzon-list/colec-buzon-list.component';
import { ColecSuscripcionListComponent } from './component/suscripcion/colec-suscripcion-list/colec-suscripcion-list.component';


const routes: Routes = [
  { path: 'buzon', component: ColecBuzonListComponent },
  { path: 'suscripcion', component: ColecSuscripcionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColeccionesRoutingModule { }
