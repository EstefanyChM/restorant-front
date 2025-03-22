import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Pickup } from 'src/app/private/colecciones/models/pickup.model';
import { PickupService } from 'src/app/private/pedido/service/pickup.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { VentaResponse } from 'src/app/private/modulo-pedido-venta/models/venta-response';
import { VentaService } from 'src/app/private/modulo-pedido-venta/service/venta.service';
import { VentaRequest } from 'src/app/private/modulo-pedido-venta/models/venta-request';
import { ServicioDePedidosFinalizadosService } from 'src/app/private/shared/services/servicio-de-pedidos-finalizados.service';

@Component({
  selector: 'app-venta-pickup-list',
  templateUrl: './venta-pickup-list.component.html',
  styleUrl: './venta-pickup-list.component.scss'
})
export class VentaPickupListComponent  implements OnInit {
  ventas: VentaResponse[] = [];
  ventaSelected: VentaResponse = new VentaResponse();
  detallesVenta: VentaResponse = new VentaResponse();

  detallesDialogoVisible: boolean = false;

  selectedList: SelectItem = { value: '' };


  categorias: { label: string; value: number }[] = [];
  rangeValues: number[] = [0, 100];

  constructor(
    private fb: FormBuilder,
    private _ventaService: VentaService,
    private websocketService: WebsocketService,
        private _servicioDePedidosFinalizadosService:ServicioDePedidosFinalizadosService)


   {
  }

  ngOnInit(): void {
    this.filtrar();
    // Escuchar el evento único desde el servidor de Socket.IO

    this.websocketService.listen('pedido-finalizado-back').subscribe((payload: any) => {
      console.log('Evento "pedido-finalizado-back" recibido desde el servidor:', payload);
      console.log('en tienda escucha');

      this.filtrar(); // Actualiza la vista con los datos recibidos


    });


  }

  filtrar() {

    this._ventaService.obtenerVentasRecojoPagadas().subscribe({
      next: (data: VentaResponse[]) => {
        console.log('recibo -->>', data);
        this._servicioDePedidosFinalizadosService.updatePickupBackBackLength(data.length);

        this.ventas = data;
      },
      error: () => { },
      complete: () => { },
    });
  }


  loading: boolean = true;
  ventaBack: VentaResponse = new VentaResponse();


  abrirDetalles(venta: VentaResponse) {
    this._ventaService.getById(venta.id).subscribe({
      next: (data: VentaResponse) => {
        console.log('recibo -->>', data);
        this.detallesVenta = data;
        this.detallesDialogoVisible = true;
      },
      error: () => {
        alert('No se pudo cargar los detalles.');
      },
    });
  }

  imprimirDetallesParaCocina(venta: VentaResponse) {
    this._ventaService.generateDetallesCocina(venta.id).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Para_Cocina-${venta.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        alert('No se pudo imprimir para cocina.');
      },
    });
  }

  finalizarVenta(venta: VentaResponse) {
    venta.idEstadoVenta = 1;

    this._ventaService.update(venta).subscribe({
      next: (data: VentaResponse) => {
        this.ventaBack = data

        this.filtrar(); // Refresca la lista de ventas después de finalizar
      },
      error: () => {
        alert('No se pudo finalizar la venta.');
      },
      complete:() =>{
        this.imprimirComprobante(this.ventaBack.id);
        alert_success('Venta finalizada', 'El pedido se entregó');


      }
    });
  }






  cancelar() {
    this.displayDialog = false;
  }

  displayDialog: boolean = false;


  imprimirComprobante(ventaId: number) {
    console.log('ahora te woa imprimir');

    this._ventaService.generateComprobante(ventaId).subscribe({
      next: (response: Blob) => {  // Captura la respuesta como un Blob
        const url = window.URL.createObjectURL(response); // Crea una URL para el Blob
        const link = document.createElement('a'); // Crea un enlace para la descarga
        link.href = url;
        link.download = `Comprobante-${ventaId}.pdf`; // Define el nombre del archivo
        link.click(); // Inicia la descarga
        window.URL.revokeObjectURL(url); // Libera la URL creada
      },
      error: () => {
        alert('No se cargó el pedido');
      }
    });
  }








}
