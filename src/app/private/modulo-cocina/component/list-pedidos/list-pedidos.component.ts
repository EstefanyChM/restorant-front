import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DetallePedidoResponse } from 'src/app/private/pedido/models/detalle-pedido-response.model';
import { DetallePedidoRequest } from 'src/app/private/pedido/models/detalle-pedido.model';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';
import { PedidoService } from 'src/app/private/pedido/service/pedido.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { AudioService } from '../../services/audio.service';
import { alert_error, alert_success } from 'src/app/shared/functions/general.functions';
import { MessageService, SelectItem } from 'primeng/api';


@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrl: './list-pedidos.component.scss',
  //***changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPedidosComponent implements OnInit {

  PedidosRecibidos: PedidoResponse[] = [];
  detallePedidoSeleccionado!: DetallePedidoRequest;

  indiceCard: number = 0;
  indiceRow: number = 0;

  componente: string = 'Pendiente';


  constructor(
    private _pedidoService: PedidoService,
    private websocketService: WebsocketService,
    private _audioService: AudioService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef

    //****private cdr: ChangeDetectorRef  // Inyectar ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listarPedidos();
    this.websocketService.listen('detalles-pedidos-recibidos').subscribe((payload: any) => {
      this.listarPedidos();

    });
  }

  listarPedidos(): void {
    console.log('listando');

    this._pedidoService.getAllCocina(false).subscribe({
      next: (data) => {
        this.PedidosRecibidos = data;
        //console.table(this.PedidosRecibidos);
        // Notificar a Angular que debe verificar el componente
        //*****this.cdr.markForCheck();
        this.cdr.detectChanges() // 🔥 Forzamos la detección de cambios

      },
      error: () => { },
      complete: () => { },
    });
  }

  detallePedidoFinalizado(pedidoIndex: number, rowIndex: number) {

    console.log(`${pedidoIndex}, ${rowIndex}`);
    console.log(this.PedidosRecibidos[pedidoIndex - 1]?.detallePedidoResp[rowIndex - 1]);

    const idDetallePedido = this.PedidosRecibidos[pedidoIndex - 1]?.detallePedidoResp[rowIndex - 1].id

    this._pedidoService.detallePedidoFinalizado(idDetallePedido).subscribe({
      next: () => {
        console.log('ENTRÉ AL MÉTODO PARA HACER LA SOLICITUD HTTP AL MI WEB API');
          this.messageService.add({ severity: "success", summary: "Éxito", detail: "Detalle pedido hecho", life: 3000 });
        this.indiceCard = 0;
        this.indiceRow = 0;
        this.listarPedidos()
        this.websocketService.emit("detalles-pedidos-enviado")

        //this.cdr.detectChanges();


      },
      error: () => { },
      complete: () => { },
    })
  }

  /********************************* */
  //AUDIO
  /************************************** */

  isRecording = false;


  mediaRecorder: MediaRecorder | undefined;
  audioChunks: Blob[] = [];
  isHovered: boolean = false; // Flag to control hover effect
  startRecording() {
    this.isRecording = true;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = event => {
        this.audioChunks.push(event.data);
      };
      this.mediaRecorder.start();
    });
  }

  stopRecording() {
    this.isRecording = false;


    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = async () => {  // Agregar `async`
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        this.audioChunks = [];

        // Convertir audio a 16kHz antes de enviarlo
        const convertedAudioBlob = await this.convertTo16kHz(audioBlob);

        // Reproducir el audio convertido antes de enviarlo
        /*const audioURL = URL.createObjectURL(convertedAudioBlob);
        const audio = new Audio(audioURL);
        audio.play();
        console.log("Tamaño del audio convertido (bytes):", convertedAudioBlob.size);*/

        this.sendAudio(convertedAudioBlob);
      };
    }
  }

  sendAudio(audioBlob: Blob) {
    this._audioService.sendAudio(audioBlob).subscribe({
      next: (response) => {
        console.log('RESPUESTA DE DIALOGFLOW', response);

        let intencion = response.intencion;

        switch (intencion) {
          case 'Selección de Pedido':
              this.indiceCard = Number(response.indice);
              this.indiceRow = 0;  // Reiniciar fila cuando se cambia de pedido
              console.log('índice: ', this.indiceCard);

            break;

          case 'Selección de Fila':
            this.indiceRow = Number(response.indice);
            console.log('indice a seleccionar: ', this.indiceRow);

            break;
          case 'Detalle Pedido Finalizado':
            this.detallePedidoFinalizado(this.indiceCard, this.indiceRow)
            break;
          case 'Cancelar':
            if (this.indiceRow != 0 || this.indiceCard != 0) this.cancelar();
            else alert_error('Uhm?', '¿Qué quiere cancelar mi ciela 😜?')
            break;
          case 'Saludo':
            alert_success('Hola', 'Comienza a hacer tus órdenes para detectar el detalle pedido que ya realizaste')
            break;
          default:
            console.log('Aún no mi ciela 💋');
            alert_error('Error', 'Lo lamento, no entendí, vuelva a mandar la orden')
            break;
        }
        this.cdr.detectChanges(); // 🔥 Forzamos la detección de cambios

      },
      error: (error) => { alert_error(error.error, error.message) }
    });
  }

  cancelar(): void {
    if (this.indiceRow != 0 && this.indiceCard != 0) {
      this.indiceRow = 0;
      this.indiceCard = 0
    }

    if (this.indiceRow != 0) {
      this.indiceRow = 0;
    }
  }

  /************** CONVERSIÓN DE AUDIO ********************* */

  async convertTo16kHz(audioBlob: Blob): Promise<Blob> {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext({ sampleRate: 44100 }); // 🎙️ El navegador graba en 44.1kHz por defecto
    const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);

    // 🎚️ Crear un nuevo contexto de audio con 16kHz
    const offlineContext = new OfflineAudioContext(1, decodedAudio.length * 16000 / 44100, 16000);
    const source = offlineContext.createBufferSource();
    source.buffer = decodedAudio;
    source.connect(offlineContext.destination);
    source.start(0);

    const renderedBuffer = await offlineContext.startRendering();
    const pcmData = renderedBuffer.getChannelData(0);
    const wavBlob = this.encodeWAV(pcmData, 16000);

    return wavBlob;
  }

  // 🔹 Función para convertir PCM a WAV
  encodeWAV(samples: Float32Array, sampleRate: number): Blob {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    this.writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    this.writeString(view, 8, "WAVE");
    this.writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      offset += 2;
    }

    return new Blob([buffer], { type: "audio/wav" });
  }

  // 🔹 Función auxiliar para escribir strings en el DataView
  writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

}
