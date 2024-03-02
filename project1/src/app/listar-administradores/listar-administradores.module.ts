import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarAdministradoresPageRoutingModule } from './listar-administradores-routing.module';

import { ListarAdministradoresPage } from './listar-administradores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarAdministradoresPageRoutingModule
  ],
  declarations: [ListarAdministradoresPage]
})
export class ListarAdministradoresPageModule {}
