import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authPersonalGuard } from './auth/guard/authPersonal.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./public/template/template.module").then(x => x.TemplateModule)
  },

  {
    path: 'auth', loadChildren: () => import("./auth/auth.module").then(x => x.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authPersonalGuard],
    loadChildren: () => import("./private/template/template.module").then(x => x.TemplateModule)
  },
  {
    path: 'modulo-cocina',
    canActivate: [authPersonalGuard],
    loadChildren: () => import("./private/modulo-cocina/modulo-cocina.module").then(x => x.ModuloCocinaModule)
    //loadChildren: () => import("./layout/app.layout.module").then(x=>x.AppLayoutModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import("./public/pages/profile/profile.module").then(x => x.ProfileModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
