import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPedidosComponent } from './component/list-pedidos/list-pedidos.component';
import { ModuloCocinaRoutingModule } from './modulo-cocina-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListPedidosHechosComponent } from './component/list-pedidos-hechos/list-pedidos-hechos.component';
import { HeaderConectionComponent } from './component/header-conection/header-conection.component';



@NgModule({
  declarations: [
    ListPedidosComponent,
    ListPedidosHechosComponent,
    HeaderConectionComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    ModuloCocinaRoutingModule
  ]
})
export class ModuloCocinaModule { }
