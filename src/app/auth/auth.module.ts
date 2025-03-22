import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components-public/login/login.component';
import { LogoutComponent } from './components-public/logout/logout.component';
import { RecoveryPwdComponent } from './components-public/recovery-pwd/recovery-pwd.component';
import { RegisterComponent } from './components-public/register/register.component';
/********************** */
import { LoginComponent as LoginComponentPrivate } from './components-private/login/login.component';


import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RecoveryPwdComponent,
    RegisterComponent,
    LoginComponentPrivate

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
