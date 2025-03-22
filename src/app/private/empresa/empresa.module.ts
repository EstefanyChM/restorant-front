import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaRegisterComponent } from './components/empresa-register/empresa-register.component';
import { EmpresaDatesComponent } from './components/empresa-dates/empresa-dates.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpresaHorarioComponent } from './components/empresa-horario/empresa-horario.component';
import { EmpresaAsuntoMensageComponent } from './components/empresa-asunto-mensage/empresa-asunto-mensage.component';
import { EmpresaMesaComponent } from './components/empresa-mesa/empresa-mesa.component';


@NgModule({
  declarations: [
    EmpresaRegisterComponent,
    EmpresaDatesComponent,
    EmpresaHorarioComponent,
    EmpresaAsuntoMensageComponent,
    EmpresaMesaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule
  ]
})
export class EmpresaModule { }
