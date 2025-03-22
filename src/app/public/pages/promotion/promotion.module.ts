import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionDiscountListComponent } from './components/promotion-discount-list/promotion-discount-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { PromotionDiscountOrderComponent } from './components/promotion-discount-order/promotion-discount-order.component';




@NgModule({
  declarations: [
    PromotionDiscountListComponent,
    PromotionDiscountOrderComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    SharedModule,
    TabViewModule,
        MessagesModule
      ],

      providers: [MessageService],})
export class PromotionModule { }
