
import { ServicioDePedidosFinalizadosService } from 'src/app/private/shared/services/servicio-de-pedidos-finalizados.service';

import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { EnTiendaService } from 'src/app/private/modulo-pedido-venta/service/en-tienda.service';
import { VentaService } from 'src/app/private/modulo-pedido-venta/service/venta.service';
import { EventoService } from 'src/app/private/shared/services/evento-service';
import { Subscription } from 'rxjs';
import { BuzonService } from 'src/app/private/colecciones/service/buzon.service';


@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.scss'],
})


export class TemplateHeaderComponent implements OnInit, OnDestroy {
  ventasPedidosOnlineCount: number[] = [];
  pedidosEntiendaFinalizada: number = 0;
  messagesCount:number =0;
  private pedidoSub!: Subscription;

  constructor(private eventoService: EventoService,
    private _ventaService : VentaService,
    private _buzonService : BuzonService
  ) {}

  ngOnInit(): void {
    this.actualizarCantidadDeNotificaciones(); 

    this.pedidoSub = this.eventoService.pedidoFinalizado$.subscribe(payload => {
      console.log('HeaderComponent recibió el pedido finalizado:', payload);
      this.actualizarCantidadDeNotificaciones(); 
    });
  }

  actualizarCantidadDeNotificaciones(): void {
    this._ventaService.onlineSalesCount().subscribe(
      (data) => this.ventasPedidosOnlineCount = data
    ),

    this._ventaService.storeOrderCount().subscribe(
      (data) => this.pedidosEntiendaFinalizada = data
    ),

    this._buzonService.getMessagesQuantity().subscribe(
      (mensajes) => this.messagesCount = mensajes
    )

    console.log(this.ventasPedidosOnlineCount[0]);
    console.log(this.ventasPedidosOnlineCount[1]);
    console.log(this.pedidosEntiendaFinalizada);
    
    
  }



  menuItems = [
    {
      icon: 'fa-truck-fast',
      color: '#ff7300',
      link: '/dashboard/modulo-venta/lista-delivery',
      tooltip: 'Pedidos Delivery',
      count: () => this.ventasPedidosOnlineCount[0]
    },
    {
      icon: 'fa-shop',
      color: '#ff7300',
      link: '/dashboard/modulo-venta/lista-pickup',
      tooltip: 'Pedidos Recojo en Tienda',
      count: () => this.ventasPedidosOnlineCount[1]
    },
    {
      icon: 'fa-receipt',
      color: '#ff7300',
      link: '/dashboard/modulo-venta/lista-venta',
      tooltip: 'Pedidos en Tienda',
      count: () => this.pedidosEntiendaFinalizada
    },
    {
      icon: 'fa-envelope',
      color: '#ffed9f',
      link: '/dashboard/modulo-venta/lista-venta',
      tooltip: 'Mensajes del Cliente',
      count: () => this.messagesCount
    }
  ];
  getIconClasses(item: any) {
    return {
      [item.icon]: !!item.icon, // Verifica que item.icon no sea null o undefined
      'fa-2xl': true,
      'animate-icon': item.count() > 0
    };
  }
  




  ngOnDestroy(): void {
    if (this.pedidoSub) {
      this.pedidoSub.unsubscribe();
    }
  }
}
