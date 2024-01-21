import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerProductoPageRoutingModule } from './ver-producto-routing.module';

import { VerProductoPage } from './ver-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerProductoPageRoutingModule
  ],
  declarations: [VerProductoPage]
})
export class VerProductoPageModule {}
