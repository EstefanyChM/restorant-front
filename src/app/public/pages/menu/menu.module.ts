import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuMenuOrderComponent } from './menu-menu-order/menu-menu-order.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { MenuMenuProductsComponent } from './menu-menu-products/menu-menu-products.component';

import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    MenuMenuOrderComponent,
    MenuMenuProductsComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule,

    TabViewModule,
    MessagesModule
  ],

  providers: [MessageService],
})
export class MenuModule { }
