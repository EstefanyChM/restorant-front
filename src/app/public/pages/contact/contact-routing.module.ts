import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactContactPageComponent } from './contact-contact-page/contact-contact-page.component';


const routes: Routes = [
  {
    path : '', component: ContactContactPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
