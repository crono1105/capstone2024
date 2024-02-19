import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = {
    correo_electronico: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async login() {
    try {
      const resultUsuario = await this.authService.loginUsuario(this.credenciales);
      console.log('Login de usuario exitoso', resultUsuario);
      await this.presentCustomAlert('¡Inicio de sesión exitoso como usuario!');
      this.router.navigate(['/home']);
    } catch (errorUsuario) {
      
      try {
        const resultAdmin = await this.authService.loginAdmin(this.credenciales);
        console.log('Login de administrador exitoso', resultAdmin);

        // Puedes realizar acciones específicas para el administrador aquí
        await this.presentCustomAlert('¡Inicio de sesión exitoso como administrador!');
        this.router.navigate(['lista-reportes']);
      } catch (errorAdmin) {
        console.error('Error al iniciar sesión', errorAdmin);
      }
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
