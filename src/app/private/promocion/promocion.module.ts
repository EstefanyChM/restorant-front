import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionRoutingModule } from './promocion-routing.module';
import { PromocionCrearComponent } from './componentes/promocion-crear/promocion-crear.component';
import { PromocionListaComponent } from './componentes/promocion-lista/promocion-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [
    PromocionCrearComponent,
    PromocionListaComponent
  ],
  imports: [
    CommonModule,
    PromocionRoutingModule,
    SharedModule,
    DividerModule

  ]
})
export class PromocionModule { }
