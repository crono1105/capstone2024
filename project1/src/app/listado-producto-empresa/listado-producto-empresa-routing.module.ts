import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoProductoEmpresaPage } from './listado-producto-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoProductoEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoProductoEmpresaPageRoutingModule {}
