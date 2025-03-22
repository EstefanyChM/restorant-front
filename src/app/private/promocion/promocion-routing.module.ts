import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocionListaComponent } from './componentes/promocion-lista/promocion-lista.component';
import { PromocionCrearComponent } from './componentes/promocion-crear/promocion-crear.component';

const routes: Routes = [
  {path: 'lista-promocion', component: PromocionListaComponent},
  {path: 'agregar-promocion', component: PromocionCrearComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocionRoutingModule { }
