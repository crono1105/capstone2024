import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCategoriaPageRoutingModule } from './agregar-categoria-routing.module';

import { AgregarCategoriaPage } from './agregar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCategoriaPageRoutingModule
  ],
  declarations: [AgregarCategoriaPage]
})
export class AgregarCategoriaPageModule {}
