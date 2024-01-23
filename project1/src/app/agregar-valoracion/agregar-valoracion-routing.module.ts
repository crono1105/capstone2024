import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarValoracionPage } from './agregar-valoracion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarValoracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarValoracionPageRoutingModule {}
