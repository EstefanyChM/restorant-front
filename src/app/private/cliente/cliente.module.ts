import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';

import { CliClienteListComponent } from './component/cliente/cli-cliente-list/cli-cliente-list.component';
import { CliClienteRegisterComponent } from './component/cliente/cli-cliente-register/cli-cliente-register.component';

import { SharedModule } from 'src/app/shared/shared.module';

//import { sharedClienteModule } from '../shared/sharedCliente.module';

@NgModule({
  declarations: [
    CliClienteListComponent,
    CliClienteRegisterComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,

    SharedModule,
    //sharedClienteModule

  ],
  exports: [CliClienteRegisterComponent]
})
export class ClienteModule { }
