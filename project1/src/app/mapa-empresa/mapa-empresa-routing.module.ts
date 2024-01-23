import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaEmpresaPage } from './mapa-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: MapaEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaEmpresaPageRoutingModule {}
