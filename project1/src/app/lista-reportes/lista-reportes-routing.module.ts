import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaReportesPage } from './lista-reportes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaReportesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaReportesPageRoutingModule {}
