import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private authService: AuthService,private router: Router,private alertController: AlertController) {}

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
      await this.presentCustomAlert('¡Empresa registrada con exito!');
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      await this.presentCustomAlert('¡Empresa registrada con exito!');
    }
  }

  goToListarEmpresa(){
    this.router.navigate(['/listar-empresas']);
  }

  
  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Empresa ',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
