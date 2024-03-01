import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async crearAdministrador() {
    try {
      const resultado = await this.authService.registrarAdmin(this.admin);
      console.log('Administrador creado con éxito:', resultado);
      
    } catch (error) {
      console.error('Error al crear administrador:', error);
    }
  }
}
