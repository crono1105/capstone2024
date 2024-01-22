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
  datosGrafico: any[] = [];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{ // Cambio aquí
        type: 'time',
        time: {
          unit: 'day', // O ajusta a tu necesidad
        },
        scaleLabel: {
          display: true,
          labelString: 'Fechas',
        },
      }],
      yAxes: [{ // Cambio aquí
        scaleLabel: {
          display: true,
          labelString: 'Valor',
        },
      }],
    },
  };

  public lineChartLabels: any[] = [];
  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;
  public lineChartData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const idProductoString = this.route.snapshot.paramMap.get('idProducto');

    if (idProductoString !== null) {
      const idProducto = parseInt(idProductoString, 10);

      try {
          
        this.detalleProducto = await this.authService.obtenerDetalleProducto(idProducto);

        // Procesa los datos para ng2-charts
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
}
  