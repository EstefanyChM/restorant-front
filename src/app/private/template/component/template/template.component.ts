import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { message_notification } from 'src/app/shared/functions/general.functions';
import { EventoService } from 'src/app/private/shared/services/evento-service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {
  
  private notificacionSub!: Subscription; // Almacenar la suscripción

  constructor(
    private websocketService: WebsocketService,
    private eventoService: EventoService) {}

  ngOnInit(): void {
    this.notificacionSub = this.websocketService.listen('notificacion-angular')
      .subscribe((payload: any) => {
        message_notification()
      });

      this.websocketService.listen('pedido-finalizado-back')
      .subscribe((payload: any) => {
        console.log('Evento "pedido-finalizado-back" recibido desde el servidor:', payload);
        this.eventoService.emitirPedidoFinalizado(payload); 
      });

      this.websocketService.listen('recibir-pedido').subscribe((payload: any) => {
        console.log('Template recibe pedido en tienda finalizada:', payload);
        //alert('recibo: ' + JSON.stringify(payload, null, 2)); // Mostrar el objeto completo como JSON
        this.eventoService.emitirPedidoFinalizado(payload); 

      });
  }

  ngOnDestroy(): void {
    if (this.notificacionSub) {
      this.notificacionSub.unsubscribe(); // Evita fugas de memoria
    }
  }
}
