import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './component/template/template.component';
import { OurServicesComponent } from '../pages/our-services/our-services.component';
import { AboutAboutPageComponent } from '../pages/about/about-about-page.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children: [
      {
        path: '', loadChildren: () => import("./../pages/home/home.module").then(x => x.HomeModule)
      },
      {
        path: 'about', component:AboutAboutPageComponent
      },
      {
        path: 'menu', loadChildren: () => import("./../pages/menu/menu.module").then(x => x.MenuModule)
      },
      {
        path: 'menu/:categoriaNombre', // Define el parámetro dinámico en la ruta
        loadChildren: () => import("./../pages/menu/menu.module").then(x => x.MenuModule)
      },
      {
        path: 'contact', loadChildren: () => import("./../pages/contact/contact.module").then(x => x.ContactModule)
      },
       {
        path: 'login', loadChildren: ()=>import("src/app/auth/auth.module").then(x=>x.AuthModule)
      },
      {
        path: 'cart', loadChildren: () => import("./../pages/cart/cart.module").then(x => x.CartModule)
      },
      {
        path: 'success', loadChildren: () => import("./../pages/mercado-pago/mercado-pago.module").then(x=>x.MercadoPagoModule)
      },
      {
        path: 'perfil', loadChildren: () => import("./../pages/profile/profile.module").then(x=>x.ProfileModule)
      },

      {
        path: 'our-services', component: OurServicesComponent
      },
      {
        path: 'promotions', loadChildren: () => import("./../pages/promotion/promotion.module").then(x=>x.PromotionModule)
      },



    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class TemplateRoutingModule { }
