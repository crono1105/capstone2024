import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nuevoUsuario = {
    correo_electronico: '',
    nombre_completo: '',
    password: '',
    telefono: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  async registrarUsuario() {
    console.log(this.nuevoUsuario);
    try {
      
      const data = await this.authService.registrarUsuario(this.nuevoUsuario);
      await this.presentCustomAlert('¡Usuario registrado con exito!');
      this.router.navigate(['/login']);
      this.nuevoUsuario = {
        correo_electronico: '',
        nombre_completo: '',
        password: '',
        telefono: ''
      };
    } catch (error) {
      await this.presentCustomAlert('¡Campos ingresados de manera erronea!');
      console.error('Error al registrar usuario', error);
    }
  }

  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Usuario ',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
