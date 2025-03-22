import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColeccionesRoutingModule } from './colecciones-routing.module';

import { ColecBuzonListComponent } from './component/buzon/colec-buzon-list/colec-buzon-list.component';
import { ColecBuzonMultipleComponent } from './component/buzon/colec-buzon-multiple/colec-buzon-multiple.component';
import { ColecBuzonReplyComponent } from './component/buzon/colec-buzon-reply/colec-buzon-reply.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { ColecSuscripcionListComponent } from './component/suscripcion/colec-suscripcion-list/colec-suscripcion-list.component';


/************************* */
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';

//import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    ColecBuzonListComponent,
    ColecBuzonMultipleComponent,
    ColecBuzonReplyComponent,
    ColecSuscripcionListComponent
  ],
  imports: [
    CommonModule,
    ColeccionesRoutingModule,

    SharedModule,

    /********************* */

		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,

    //PaginatorModule

  ]
})
export class ColeccionesModule { }
