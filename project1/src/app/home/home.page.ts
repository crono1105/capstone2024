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
  busquedaPalabraClave: string = '';
  filteredProductos: any[] = [];

  constructor(private router: Router, private authService: AuthService) { }
  publicidades: any[] = [];
  ngOnInit(): void {
    // Llama a la función para obtener todos los productos al inicializar la página
    this.obtenerProductos();
    this.obtenerPublicidades();
  }

  // Resto del código

  // Función para obtener todos los productos
  obtenerProductos() {
    this.authService.obtenerTodosLosProductos().then((productos) => {
      this.productos = productos;
      this.filteredProductos = productos; // Inicialmente, muestra todos los productos
      console.log('Lista de productos:', this.productos);
    }).catch((error) => {
      console.error('Error al obtener todos los productos:', error);
    });
  }


  filtrarProductos() {

    if (this.productos && this.productos.length > 0) {
      // Filtra los productos solo si hay una palabra clave
      if (this.busquedaPalabraClave.trim() !== '') {
        this.filteredProductos = this.productos.filter((producto) => {
          // Asegúrate de que los campos relevantes existan antes de usar toLowerCase
          const nombreProducto = producto.nombre_producto ? producto.nombre_producto.toLowerCase() : '';
          const descripcionProducto = producto.descripcion_producto ? producto.descripcion_producto.toLowerCase() : '';
          const categoria = producto.nombre_categoria ? producto.nombre_categoria.toLowerCase() : '';
          const comuna = producto.nombre_comuna ? producto.nombre_comuna.toLowerCase() : '';
          return (
            nombreProducto.includes(this.busquedaPalabraClave.toLowerCase()) ||
            descripcionProducto.includes(this.busquedaPalabraClave.toLowerCase()) ||
            categoria.includes(this.busquedaPalabraClave.toLocaleLowerCase()) ||
            comuna.includes(this.busquedaPalabraClave.toLowerCase())
          );
        });
      } else {
        // Si no hay palabra clave, muestra todos los productos
        this.filteredProductos = [...this.productos];
      }
    }
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

  goToPerfil() {
    this.usuarioCorreo = this.authService.obtenerCorreoElectronico();

    if (this.usuarioCorreo) {
      this.router.navigate(['/perfil-usuario', this.usuarioCorreo]);
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario logueado.');
    }
  }

  goToVerProducto(id_producto: String) {
    this.router.navigate(['/ver-producto/', id_producto]);
  }

  filtrarProductosConBoton() {
    this.filtrarProductos();
  }

  async obtenerPublicidades() {
    try {
      this.publicidades = await this.authService.obtenerPublicidades();
      console.log(this.publicidades);
    } catch (error) {
      console.error('Error al obtener publicidades en la página de inicio:', error);
    }
  }
}
