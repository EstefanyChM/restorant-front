import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './component/template/template.component';
import { TemplateHeaderComponent } from './component/template-header/template-header.component';
import { TemplateFooterComponent } from './component/template-footer/template-footer.component';
import { TemplateNavComponent } from './component/template-nav/template-nav.component';

import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartModalComponent } from '../pages/cart/cart-modal/cart-modal.component';
import { CartModule } from '../pages/cart/cart.module';

import { TemplateChatComponent } from './component/template-chat/template-chat.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [
    TemplateComponent,
    TemplateHeaderComponent,
    TemplateFooterComponent,
    TemplateNavComponent,
    TemplateChatComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedModule,
    AuthModule,
    CartModule,

],
schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TemplateModule { }
