import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})
export class VerProductoPage implements OnInit {
  detalleProducto: any;
  datosGrafico: any[] = [];
  public resenas: any[] = [];
  promedioValoracion: number=0;
  public lineChartLabels: any[] = [];
  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;
  public lineChartData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const idProductoString = this.route.snapshot.paramMap.get('idProducto');

    if (idProductoString !== null) {
      const idProducto = parseInt(idProductoString, 10);

      try {
        this.datosGrafico = await this.authService.obtenerActualizacionesPorProducto(idProducto.toString());
        this.detalleProducto = await this.authService.obtenerDetalleProducto(idProducto);
        this.resenas = await this.authService.obtenerResenasPorProducto(idProducto);
        const promedioResponse = await this.authService.calcularPromedioValoracion(idProducto.toString());
        this.promedioValoracion = promedioResponse.promedioValoracion;
        this.lineChartLabels = this.datosGrafico.map(actualizacion => new Date(actualizacion.fecha));
        this.lineChartData = [
          {
            data: this.datosGrafico.map(actualizacion => actualizacion.valor),
            label: 'Valor',
          },
        ];
      } catch (error) {
        console.error('Error al obtener el detalle del producto:', error);
      }
    } else {
      console.error('ID de producto nulo');
    }
  }

  goToVerMapa(id_empresa: String) {
    this.router.navigate(['/mapa-empresa/', id_empresa]);
  }

  goToCrearReview(id_producto: String) {
    this.router.navigate(['/agregar-valoracion/', id_producto]);
  }
}
