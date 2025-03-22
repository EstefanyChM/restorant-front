import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaMesaListComponent } from './components/mesa-mesa-list/mesa-mesa-list.component';

const routes: Routes = [
  {path:'lista-mesa', component: MesaMesaListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaRoutingModule { }
