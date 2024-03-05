import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.page.html',
  styleUrls: ['./crear-admin.page.scss'],
})
export class CrearAdminPage implements OnInit {
  admin = {
    correo_electronico: '',
    nombre_completo: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router,private alertController: AlertController) { }

  ngOnInit() {
  }

  async crearAdministrador() {
    try {
      const resultado = await this.authService.registrarAdmin(this.admin);
      console.log('Administrador creado con éxito:', resultado);
      await this.presentCustomAlert('¡Administrador creado con éxito!');
      this.GoTolistaReportes();
      
    } catch (error) {
      await this.presentCustomAlert('¡Error al crear administrador!');
      console.error('Error al crear administrador:', error);
    }
  }
  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Crear administrador',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  GoTolistaReportes(){
    this.router.navigate(['/lista-reportes']);
  }
}
