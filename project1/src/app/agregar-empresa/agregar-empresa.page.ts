import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.page.html',
  styleUrls: ['./agregar-empresa.page.scss'],
})
export class AgregarEmpresaPage implements OnInit {
  empresa = {
    rut_empresa: '',
    nombre_empresa: '',
    direccion: '',
    telefono_empresa: '',
    mapa: '',
    id_comuna: null
  };

  comunas: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarComunas();
  }

  async cargarComunas() {
    try {
      this.comunas = await this.authService.obtenerComunas();
    } catch (error) {
      console.error('Error al cargar comunas:', error);
    }
  }

  async registrarEmpresa() {
    try {
      const resultado = await this.authService.registrarEmpresa(this.empresa);
      console.log('Empresa registrada con éxito:', resultado);
      // Aquí puedes agregar lógica adicional después del registro, como redirigir o mostrar un mensaje
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      // Manejo de errores en el registro
    }
  }
}
