import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CliClienteListComponent } from './component/cliente/cli-cliente-list/cli-cliente-list.component';
import { CliClienteRegisterComponent } from './component/cliente/cli-cliente-register/cli-cliente-register.component';

const routes: Routes = [
  {
    path: 'lista-clientes', component: CliClienteListComponent
  },
  {
    path: 'nuevo-cliente', component: CliClienteRegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
