import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarEmpresasPageRoutingModule } from './listar-empresas-routing.module';

import { ListarEmpresasPage } from './listar-empresas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarEmpresasPageRoutingModule
  ],
  declarations: [ListarEmpresasPage]
})
export class ListarEmpresasPageModule {}
