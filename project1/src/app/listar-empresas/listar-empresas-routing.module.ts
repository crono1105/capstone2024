import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarEmpresasPage } from './listar-empresas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarEmpresasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarEmpresasPageRoutingModule {}
