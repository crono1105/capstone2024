import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarValoracionPageRoutingModule } from './agregar-valoracion-routing.module';

import { AgregarValoracionPage } from './agregar-valoracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarValoracionPageRoutingModule
  ],
  declarations: [AgregarValoracionPage]
})
export class AgregarValoracionPageModule {}
