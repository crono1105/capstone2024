import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {
  producto: any = {};

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private alertController: AlertController) {}

  ngOnInit() {
    const idProductoParam = this.route.snapshot.paramMap.get('id_producto');
    const idProducto = idProductoParam ? +idProductoParam : null;

    if (idProducto !== null && !isNaN(idProducto)) {
      this.authService.obtenerDetalleProducto(idProducto).then((producto: any) => {
        this.producto = producto;
        console.log(producto);
      });
    } else {
      console.error('El parámetro id_producto no es un número válido.');
    }
  }

  submitForm() {
    console.log(this.producto);
    if (this.producto.id_producto !== null && !isNaN(this.producto.id_producto)) {
      this.authService.modificarProducto(this.producto.id_producto, this.producto).then(() => {
        console.log('Producto modificado con éxito');
        this.presentCustomAlert('¡Producto modificado!');
        this.router.navigate(['/home']); // Redirige a la página de lista de productos
      }).catch(error => {
        this.presentCustomAlert('¡Producto modificado!');
        console.error('Error al modificar el producto:', error);
      });
    } else {
      console.error('El ID del producto no es un número válido.');
      this.presentCustomAlert('¡Producto no modificado!');
    }
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
