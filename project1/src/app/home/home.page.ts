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

  constructor(private router: Router, private authService: AuthService) {}

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
}
