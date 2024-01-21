import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerProductoPage } from './ver-producto.page';

const routes: Routes = [
  {
    path: '',
    component: VerProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerProductoPageRoutingModule {}
