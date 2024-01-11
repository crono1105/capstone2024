import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarEmpresaPage } from './agregar-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarEmpresaPageRoutingModule {}
