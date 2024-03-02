import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarAdministradoresPage } from './listar-administradores.page';

const routes: Routes = [
  {
    path: '',
    component: ListarAdministradoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarAdministradoresPageRoutingModule {}
