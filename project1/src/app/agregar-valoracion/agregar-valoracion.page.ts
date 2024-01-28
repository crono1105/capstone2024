import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-agregar-valoracion',
  templateUrl: './agregar-valoracion.page.html',
  styleUrls: ['./agregar-valoracion.page.scss'],
})
export class AgregarValoracionPage implements OnInit {
  valoracion: number = 0;
  comentario: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,private alertController: AlertController) { }

  ngOnInit() {
    // Puedes agregar lógica adicional que deseas ejecutar al inicializar la página
  }

  agregarValoracion() {
    const productId = this.route.snapshot.params['id_producto'];

    this.authService.valorarProducto(productId, this.valoracion, this.comentario)
      .then(() => {
        this.presentCustomAlert('¡Reseña ingresada con extio!');
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.presentCustomAlert('¡Reseña ingresada con extio!');
        console.error('Error al agregar valoración:', error);
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
