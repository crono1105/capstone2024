import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  nombreCategoria: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async agregarCategoria() {
    try {
      const categoria = { nombre_categoria: this.nombreCategoria };
      const resultado = await this.authService.agregarCategoriaProducto(categoria);
      console.log('Categoría de producto agregada con éxito:', resultado);
     
    } catch (error) {
      console.error('Error al agregar categoría de producto:', error);
     
    }
  }
}