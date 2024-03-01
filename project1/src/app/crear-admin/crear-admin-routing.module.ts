import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAdminPage } from './crear-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAdminPageRoutingModule {}
