import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionDiscountListComponent } from './components/promotion-discount-list/promotion-discount-list.component';

const routes: Routes = [
  {path:'', component: PromotionDiscountListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
