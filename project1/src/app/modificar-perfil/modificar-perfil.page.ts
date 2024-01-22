import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  usuarioModificado: any = {
    correoElectronico: '', // El correo electrónico del usuario logeado
    nombre: '',
    contraseña: '',
    telefono: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtiene el correo electrónico del usuario logeado desde el servicio AuthService
    this.usuarioModificado.correoElectronico = this.authService.obtenerCorreoElectronico();

    // Carga los otros datos actuales del usuario usando la función getUsuarioPorCorreo
    this.cargarDatosUsuario(this.usuarioModificado.correoElectronico);
  }

  async cargarDatosUsuario(correoElectronico: string) {
    try {
      // Llama al método getUsuarioPorCorreo del servicio AuthService
      const usuario = await this.authService.getUsuarioPorCorreo(correoElectronico);
      console.log('Usuario obtenido:', usuario); // Agrega este log
      if (usuario) {
        // Asigna los datos del usuario a usuarioModificado
        this.usuarioModificado.nombre = usuario.nombre_completo;
        this.usuarioModificado.contraseña = usuario.contraseña;
        this.usuarioModificado.telefono = usuario.telefono;
      } else {
        console.error('Usuario no encontrado');
        // Maneja el caso en que el usuario no se encuentra (puede mostrar un mensaje de error).
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario.
    }
  }
  

  async modificarPerfil() {
    try {
      // Llama al método modificarUsuario del servicio AuthService
      const response = await this.authService.modificarUsuario(this.usuarioModificado);
      console.log('Usuario modificado con éxito:', response);
      // Realiza alguna acción adicional, como redirigir a la página de perfil o mostrar un mensaje de éxito.
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario.
    }
  }

  
}
