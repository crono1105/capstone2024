import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  nombreCategoria: string = '';

  constructor(private authService: AuthService,private router: Router,private alertController: AlertController) { }

  ngOnInit() {
  }

  async agregarCategoria() {
    try {
      const categoria = { nombre_categoria: this.nombreCategoria };
      const resultado = await this.authService.agregarCategoriaProducto(categoria);
      console.log('Categoría de producto agregada con éxito:', resultado);
      await this.presentCustomAlert('¡Categoria agregada con exito!');
      this.GoTolistaReportes();
     
    } catch (error) {
      console.error('Error al agregar categoría de producto:', error);
      await this.presentCustomAlert('¡Error al agregar nueva categoria!');
     
    }
  }

  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Crear categoria',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  GoTolistaReportes(){
    this.router.navigate(['/lista-reportes']);
  }
}