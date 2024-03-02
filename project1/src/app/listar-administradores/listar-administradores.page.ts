import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-listar-administradores',
  templateUrl: './listar-administradores.page.html',
  styleUrls: ['./listar-administradores.page.scss'],
})
export class ListarAdministradoresPage implements OnInit {
  administradores: any[] = [];
  public correo_electronico: string | null = null;
  constructor(private authService: AuthService) { }

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
      // Eliminar el administrador de la lista después de eliminarlo en el servidor
      this.administradores = this.administradores.filter(admin => admin.correo_electronico !== correoElectronico);
    } catch (error) {
      console.error('Error al eliminar administrador:', error);
    }
  }
}
