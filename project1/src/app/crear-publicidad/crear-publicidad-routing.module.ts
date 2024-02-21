import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPublicidadPage } from './crear-publicidad.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPublicidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPublicidadPageRoutingModule {}
