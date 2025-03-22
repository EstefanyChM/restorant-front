import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeHomePageComponent } from './home/home.component';

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeHomePageComponent,
  ],
  imports: [
    CommonModule,

    HomeRoutingModule,
    SharedModule,

  ]
})
export class HomeModule { }
