import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Importar DomSanitizer

@Component({
  selector: 'app-template-chat',
  templateUrl: './template-chat.component.html',
  styleUrl: './template-chat.component.scss'
})
export class TemplateChatComponent{
}
