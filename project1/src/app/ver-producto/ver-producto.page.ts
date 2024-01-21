import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})
export class VerProductoPage implements OnInit {
  detalleProducto: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // Obtiene el ID del producto desde la URL utilizando route.snapshot.paramMap
    const idProductoString = this.route.snapshot.paramMap.get('idProducto');
    
    if (idProductoString !== null) {
      const idProducto = parseInt(idProductoString, 10); // Convierte la cadena a número

      try {
        // Llama al servicio para obtener el detalle del producto
        this.detalleProducto = await this.authService.obtenerDetalleProducto(idProducto);
        // Asigna la respuesta al detalleProducto
      } catch (error) {
        console.error('Error al obtener el detalle del producto:', error);
        // Maneja el error aquí
      }
    } else {
      console.error('ID de producto nulo');
      // Maneja el caso en que el ID de producto es nulo
    }
  }
}
