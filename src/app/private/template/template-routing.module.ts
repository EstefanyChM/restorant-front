import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './component/template/template.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children: [
      {
        path: '', loadChildren: () => import("./../dashboard/dashboard.module").then(x => x.DashboardModule)
      },
      {
        path: 'modulo-pedido-venta', loadChildren: () => import("./../modulo-pedido-venta/pedido.module").then(x => x.PedidoModule)
      },
      {
        path: 'menu', loadChildren: () => import("./../menu/menu.module").then(x => x.MenuModule)
      },
      {
        path: 'cliente', loadChildren: () => import("./../cliente/cliente.module").then(x => x.ClienteModule)
      },
      {
        path: 'colecciones', loadChildren: () => import("./../colecciones/colecciones.module").then(x => x.ColeccionesModule)
      },
      {
        path: 'empresa', loadChildren:() => import("./../empresa/empresa.module").then(x => x.EmpresaModule)
      },
      {
        path: 'promocion', loadChildren:() => import("./../promocion/promocion.module").then(x => x.PromocionModule)
      },
      {
        path: 'modulo-pedido', loadChildren:() => import("./../modulo-pedido/mesa.module").then(x => x.MesaModule)
      },
      {
        path: 'modulo-venta', loadChildren:() => import("./../modulo-venta/venta.module").then(x => x.VentaModule)
      },
      {
        path: 'personal', loadChildren:() => import("./../personal/personal.module").then(x => x.PersonalModule)
      },
      {
        path: 'venta', loadChildren:() => import("./../venta/venta.module").then(x => x.VentaModule)
      },
      {
        path: 'pedido', loadChildren:() => import("./../pedido/pedido.module").then(x => x.PedidoModule)
      },
      {
        path: 'modulo-cocina', loadChildren:() => import("./../modulo-cocina/modulo-cocina.module").then(x => x.ModuloCocinaModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
