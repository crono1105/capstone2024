import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  productos: any[] = []; // Esta variable almacenará la lista de productos
  usuarioCorreo?: string | null;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    console.log(this.authService.isLoggedIn);

    // Llama a la función para obtener todos los productos al inicializar la página
    this.obtenerProductos();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

  goToAddEmpresa() {
    this.router.navigate(['/agregar-empresa']);
  }


  // Función para obtener todos los productos
  obtenerProductos() {
    this.authService.obtenerTodosLosProductos().then((productos) => {
      this.productos = productos;
      console.log(productos[2].img_producto);
      console.log('Lista de productos:', this.productos);
    }).catch((error) => {
      console.error('Error al obtener todos los productos:', error);
    });
  }

  goToPerfil() {
    // Obtener el correo electrónico del usuario logueado
    this.usuarioCorreo = this.authService.obtenerCorreoElectronico();

    // Verificar si se obtuvo el correo electrónico
    if (this.usuarioCorreo) {
      // Navegar a la ruta del correo electrónico logueado (ajusta la ruta según tu estructura de rutas)
      this.router.navigate(['/perfil-usuario', this.usuarioCorreo]);
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario logueado.');
      // Manejar el caso en el que no se obtiene el correo electrónico
    }
  }

  goToVerProducto(id_producto: String) {
    this.router.navigate(['/ver-producto/',id_producto]);  
  }
}
