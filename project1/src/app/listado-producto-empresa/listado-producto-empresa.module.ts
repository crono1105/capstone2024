import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoProductoEmpresaPageRoutingModule } from './listado-producto-empresa-routing.module';

import { ListadoProductoEmpresaPage } from './listado-producto-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoProductoEmpresaPageRoutingModule
  ],
  declarations: [ListadoProductoEmpresaPage]
})
export class ListadoProductoEmpresaPageModule {}
