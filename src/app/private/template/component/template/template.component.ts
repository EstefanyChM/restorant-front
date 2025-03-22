import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor( private websocketService : WebsocketService){}

  ngOnInit(): void {
    this.websocketService.listen('notificacion-angular').subscribe((payload: any) => {
      console.log('Notificación recibida:', payload);
      //alert('Noooyytificación: ' + payload.mensaje); // Mostrar la notificación
       const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        //timer: 1500,
        //timerProgressBar: false,

        showCloseButton: true,
      })

      ;(async () => {
        await Toast.fire({
          background: '#3fc3ee',
          html: '<i class="fa-solid fa-envelope fa-2x mr4"></i> <span>Tienes un nuevo mensajaaaazo, un nuevo mensajazo tienes</span>', // Usa HTML para el ícono
          title: 'Nuevo mensaje',
        })
      })()
    });
  }
}
