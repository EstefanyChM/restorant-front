import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';


@Component({
  selector: 'app-footer-connection',
  templateUrl: './footer-connection.component.html',
  styleUrls: ['./footer-connection.component.scss']
})
export class FooterConnectionComponent {
  constructor(
    public wsService: WebsocketService//
  ) { }
}
