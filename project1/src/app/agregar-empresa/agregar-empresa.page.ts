import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

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
    id_comuna: null,
    latitud:'',
    longitud:'',
  };

  comunas: any[] = [];

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.cargarComunas();
    console.log(this.cargarComunas);
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
    
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      // Manejo de errores en el registro
    }
  }

  goToListarEmpresa(){
    this.router.navigate(['/listar-empresas']);
  }
}
