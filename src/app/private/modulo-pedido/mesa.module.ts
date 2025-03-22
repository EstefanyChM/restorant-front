import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaRoutingModule } from './mesa-routing.module';
import { MesaMesaListComponent } from './components/mesa-mesa-list/mesa-mesa-list.component';
import { MesaMesaDetallesComponent } from './components/mesa-mesa-detalles/mesa-mesa-detalles.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    MesaMesaListComponent,
    MesaMesaDetallesComponent
  ],
  imports: [
    CommonModule,
    MesaRoutingModule,
    SharedModule,

    DataViewModule,
    PickListModule,
    OrderListModule,
    RatingModule,
    DialogModule,
    SharedModule,


  ]
})
export class MesaModule { }
