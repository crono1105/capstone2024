// registro.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';
import { AuthService } from '../auth.service';  // Asegúrate de tener esta importación

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule
  ],
  declarations: [RegistroPage],
  providers: [AuthService]  
})
export class RegistroPageModule {}
