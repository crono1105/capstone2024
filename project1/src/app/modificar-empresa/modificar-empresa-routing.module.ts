import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarEmpresaPage } from './modificar-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarEmpresaPageRoutingModule {}
