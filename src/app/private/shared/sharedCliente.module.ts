import { NgModule } from '@angular/core';
/*import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
*/
import { SharedModule } from 'src/app/shared/shared.module';
//import { CliClienteRegisterComponent } from '../cliente/component/cliente/cli-cliente-register/cli-cliente-register.component';

@NgModule({
  declarations: [
    //CliClienteRegisterComponent// Declarar el componente
  ],
  imports: [
    SharedModule
  ],
  exports:[
    //CliClienteRegisterComponent
  ]
})
export class sharedClienteModule { }
