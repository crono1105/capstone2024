import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAdminPageRoutingModule } from './crear-admin-routing.module';

import { CrearAdminPage } from './crear-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAdminPageRoutingModule
  ],
  declarations: [CrearAdminPage]
})
export class CrearAdminPageModule {}
