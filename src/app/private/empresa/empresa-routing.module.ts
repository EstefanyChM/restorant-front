import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaDatesComponent } from './components/empresa-dates/empresa-dates.component';
import { EmpresaHorarioComponent } from './components/empresa-horario/empresa-horario.component';
import { EmpresaMesaComponent } from './components/empresa-mesa/empresa-mesa.component';
import { EmpresaAsuntoMensageComponent } from './components/empresa-asunto-mensage/empresa-asunto-mensage.component';

const routes: Routes = [
  {path: 'datos', component: EmpresaDatesComponent},
  {path: 'horarios', component: EmpresaHorarioComponent},
  {path: 'mesas', component: EmpresaMesaComponent},
  {path: 'asuntos-mensajes', component: EmpresaAsuntoMensageComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
