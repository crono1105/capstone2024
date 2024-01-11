import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarEmpresaPageRoutingModule } from './agregar-empresa-routing.module';

import { AgregarEmpresaPage } from './agregar-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarEmpresaPageRoutingModule
  ],
  declarations: [AgregarEmpresaPage]
})
export class AgregarEmpresaPageModule {}
