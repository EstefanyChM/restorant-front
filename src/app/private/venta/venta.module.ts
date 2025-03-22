import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaListaComponent } from './components/venta-lista/venta-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    VentaListaComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    SharedModule
  ]
})
export class VentaModule { }
