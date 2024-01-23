import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaEmpresaPageRoutingModule } from './mapa-empresa-routing.module';

import { MapaEmpresaPage } from './mapa-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaEmpresaPageRoutingModule
  ],
  declarations: [MapaEmpresaPage]
})
export class MapaEmpresaPageModule {}
