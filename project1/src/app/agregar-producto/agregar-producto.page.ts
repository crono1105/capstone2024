import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  producto = {
    nombre_producto: '',
    precio: null,
    img_producto: '',
    id_categoria: '',
    rut_empresa: '',
    stock: null,
    descripcion: '',
  };

  categorias: any[] = [];
  empresas: any[] = [];

  constructor(private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarCategorias();

    this.cargarEmpresas();

  }

  async cargarCategorias() {
    try {
      this.categorias = await this.authService.obtenerCategoria();
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

  async cargarEmpresas() {
    const usuarioCorreo = localStorage.getItem('usuarioCorreo');
    if (usuarioCorreo) {
      try {
        this.empresas = await this.authService.obtenerEmpresasPorUsuario(usuarioCorreo);

      } catch (error) {
        console.error('Error al cargar empresas:', error);
      }
    }
  }

  async agregarProducto() {
    try {
      const resultado = await this.authService.agregarProducto(this.producto);
      console.log('Producto agregado con éxito:', resultado);
      await this.presentCustomAlert('¡Producto agregado con exito!');
    } catch (error) {
      await this.presentCustomAlert('¡Producto agregado con exito!');
    }
  }

  convertirImagenABase64(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.producto.img_producto = e.target.result; // Aquí asignas el resultado a tu modelo de producto
      };

      reader.readAsDataURL(file); // Esto convierte la imagen a Base64
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
