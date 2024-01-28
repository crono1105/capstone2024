import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Ajusta la ruta según la estructura de tu proyecto
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.page.html',
  styleUrls: ['./modificar-empresa.page.scss'],
})
export class ModificarEmpresaPage implements OnInit {
  empresa: any = {};
  comunas: any[] = [];
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,private alertController: AlertController) { }

  ngOnInit() {
    const rutEmpresa = this.route.snapshot.paramMap.get('rut_empresa');
    this.authService.obtenerComunas().then(comunas => {
      this.comunas = comunas;
    });
    if (rutEmpresa) {
      this.authService.obtenerDetalleEmpresa(rutEmpresa).then((empresa: any) => {
        this.empresa = empresa;
        console.log(empresa);
      });
    } else {
      console.error('El parámetro rut_empresa es nulo.');
    }
  }

  submitForm() {
    console.log(this.empresa);
    this.authService.modificarEmpresa(this.empresa).then(() => {
      console.log('Empresa modificada con éxito');
      this.presentCustomAlert('¡Empresa modificada con exito!');
      this.router.navigate(['/listar-empresas']); 
    }).catch(error => {
      this.presentCustomAlert('¡Error al modificar empresa!');
      console.error('Error al modificar la empresa:', error);
    });
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
