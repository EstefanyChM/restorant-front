import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalListaComponent } from './component/personal-lista/personal-lista.component';

const routes: Routes = [
  {
    path: 'lista', component: PersonalListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
