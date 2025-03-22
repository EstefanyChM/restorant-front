import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaListaComponent } from './components/venta-lista/venta-lista.component';

const routes: Routes = [
  {path:'lista', component:VentaListaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
