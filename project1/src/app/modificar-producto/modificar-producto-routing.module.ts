import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarProductoPage } from './modificar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarProductoPageRoutingModule {}
