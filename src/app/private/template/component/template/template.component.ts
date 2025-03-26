import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {
  
  private notificacionSub!: Subscription; // Almacenar la suscripción

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.notificacionSub = this.websocketService.listen('notificacion-angular')
      .subscribe((payload: any) => {
        console.log('Notificación recibida:', payload);
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          iconColor: 'white',
          customClass: { popup: 'colored-toast' },
          showConfirmButton: false,
          showCloseButton: true,
        });

        Toast.fire({
          background: '#3fc3ee',
          html: '<i class="fa-solid fa-envelope fa-2x mr4"></i> <span>Tienes un nuevo mensaje</span>',
          title: 'Nuevo mensaje',
        });
      });
  }

  ngOnDestroy(): void {
    if (this.notificacionSub) {
      this.notificacionSub.unsubscribe(); // Evita fugas de memoria
    }
  }
}
