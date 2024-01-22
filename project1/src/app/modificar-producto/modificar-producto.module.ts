import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarProductoPageRoutingModule } from './modificar-producto-routing.module';

import { ModificarProductoPage } from './modificar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarProductoPageRoutingModule
  ],
  declarations: [ModificarProductoPage]
})
export class ModificarProductoPageModule {}
