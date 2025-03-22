import { Component, OnInit } from '@angular/core';
import { PedidoResponse } from '../../models/pedido-response.model';
import { ChartData, ChartOptions } from 'chart.js';
import { PedidoService } from '../../service/pedido.service';

@Component({
  selector: 'app-pedido-list-graphs',
  templateUrl: './pedido-list-graphs.component.html',
  styleUrl: './pedido-list-graphs.component.scss'
})
export class PedidoListGraphsComponent  implements OnInit {

    pedidos: PedidoResponse[] = [];
    filteredPedidos: PedidoResponse[] = [];
    totalRange: number[] = [0, 1000];

    barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: [{
        label: 'Total de Ventas',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    };

    pieChartData: ChartData<'pie'> = {
      labels: ['Finalizado', 'No Finalizado'],
      datasets: [{
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384']
      }]
    };

    chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    constructor(private _pedidoService: PedidoService) {}

    ngOnInit(): void {
      this.loadPedidos();
    }

    loadPedidos(): void {
      this._pedidoService.getAll().subscribe({
        next: (data: PedidoResponse[]) => {
          this.pedidos = data;
          this.applyFilter();
        }
      });
    }

    applyFilter(): void {
      this.filteredPedidos = this.pedidos.filter(p => p.total >= this.totalRange[0] && p.total <= this.totalRange[1]);
      this.updateCharts();
    }

    updateCharts(): void {
      const groupedData = this.filteredPedidos.reduce((acc, p) => {
        acc.total += p.total;
        acc.finalizados += p.finalizado ? 1 : 0;
        return acc;
      }, { total: 0, finalizados: 0 });

      this.barChartData.labels = ['Total Ventas'];
      this.barChartData.datasets[0].data = [groupedData.total];

      this.pieChartData.datasets[0].data = [groupedData.finalizados, this.filteredPedidos.length - groupedData.finalizados];
    }
  }
