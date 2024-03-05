import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listar-administradores',
  templateUrl: './listar-administradores.page.html',
  styleUrls: ['./listar-administradores.page.scss'],
})
export class ListarAdministradoresPage implements OnInit {
  administradores: any[] = [];
  public correo_electronico: string | null = null;
  constructor(private authService: AuthService,private alertController: AlertController) { }

  ngOnInit() {
    this.listarAdministradores();
    this.correo_electronico=this.authService.obtenerCorreoElectronico();
  }

  async listarAdministradores() {
    try {
      this.administradores = await this.authService.listarAdministradores();
    } catch (error) {
      console.error('Error al listar administradores:', error);
    }
  }

  async eliminarAdministrador(correoElectronico: string) {
    try {
      await this.authService.eliminarAdministrador(correoElectronico);
     
      this.administradores = this.administradores.filter(admin => admin.correo_electronico !== correoElectronico);
      await this.presentCustomAlert('¡Administrador eliminado!');
    } catch (error) {
      console.error('Error al eliminar administrador:', error);
    }
  }

  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar administrador',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
