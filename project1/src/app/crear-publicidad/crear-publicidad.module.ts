import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPublicidadPageRoutingModule } from './crear-publicidad-routing.module';

import { CrearPublicidadPage } from './crear-publicidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPublicidadPageRoutingModule
  ],
  declarations: [CrearPublicidadPage]
})
export class CrearPublicidadPageModule {}
