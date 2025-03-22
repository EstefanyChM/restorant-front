import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-header-conection',
  templateUrl: './header-conection.component.html',
  styleUrl: './header-conection.component.scss'
})
export class HeaderConectionComponent {
  @Input() estadoDelDetallePedido: string = ''

  constructor(
      public wsService: WebsocketService,
      private router:Router
    ) { }

    selectedNodes: any = null;
    nodes = [
      { label: 'Pendientes', value: 'pedidos-pendientes' },
      { label: 'Finalizados', value: 'pedidos-finalizados' }
    ];

    navigate() {
      // Navegar a la ruta seleccionada
      if (this.selectedNodes) {
        console.log('me voy a: ', this.selectedNodes.value);

        //this.router.navigate([modulo-cocina/this.selectedNodes.value]);
        this.router.navigate([`modulo-cocina/${this.selectedNodes.value}`]);

      }
    }

}
