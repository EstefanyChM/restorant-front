import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalListaComponent } from './component/personal-lista/personal-lista.component';
import { PersonalRegisterComponent } from './component/personal-register/personal-register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagModule } from 'primeng/tag';
import { SpeedDialModule } from 'primeng/speeddial';
import { UsuarioSistemaRegistrarComponent } from './component/usuario-sistema-registrar/usuario-sistema-registrar.component';
import { UsuarioSistemaListComponent } from "./component/usuario-sistema-list/usuario-sistema-list.component";
import { ClienteModule } from "../cliente/cliente.module";


@NgModule({
  declarations: [
    PersonalListaComponent,
    PersonalRegisterComponent,
    UsuarioSistemaRegistrarComponent,

  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    SharedModule,
    TagModule,
    SpeedDialModule,
    ClienteModule
]
})
export class PersonalModule { }
