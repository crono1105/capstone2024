import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule  } from 'ng2-charts';
import { IonicModule } from '@ionic/angular';

import { VerProductoPageRoutingModule } from './ver-producto-routing.module';

import { VerProductoPage } from './ver-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerProductoPageRoutingModule,
    CommonModule,
    NgChartsModule,
  ],
  declarations: [VerProductoPage]
})
export class VerProductoPageModule {}
