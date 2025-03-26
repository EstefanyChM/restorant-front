import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalListaComponent } from './component/personal-lista/personal-lista.component';
import { UsuarioSistemaListComponent } from './component/usuario-sistema-list/usuario-sistema-list.component';

const routes: Routes = [
  {
    path: 'lista', component: PersonalListaComponent
  },
  {
    path: 'usuarios-sistema', component:UsuarioSistemaListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
