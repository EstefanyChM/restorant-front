import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { BuzonRequest } from 'src/app/private/colecciones/models/buzon-request.model';
import { BuzonResponse } from 'src/app/private/colecciones/models/buzon-response.model';
import { BuzonService } from 'src/app/private/colecciones/service/buzon.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-contact-page',
  templateUrl: './contact-contact-page.component.html',
  styleUrls: ['./contact-contact-page.component.scss']
})
export class ContactContactPageComponent implements OnInit {

  myForm: FormGroup;
  buzonEnvio: BuzonRequest = new BuzonRequest();

  asuntOptions: SelectItem[] = [
    { label: 'Disponibilidad', value: 1},
    { label: 'PoliticasCondiciones', value: 2},
    { label: 'ComentariosOpiniones', value: 3},
    { label: 'PromocionesOfertas', value: 4},
    { label: 'Informacion', value: 5},

  ];



  constructor(
    private fb: FormBuilder,
    private _buzonService: BuzonService,

    private websocketService: WebsocketService
  ) {
    this.myForm = this.fb.group(
      {
        remiteNombre: [null,[Validators.required]],
        remiteEmail: [null, [Validators.required]],
        idAsunto:[null, [Validators.required]],
        mensaje: [null, [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    // Escuchar la notificación desde el servidor
    /*this.wsService.listen('notificacion-angular').subscribe((payload: any) => {
      console.log('Notificación recibida:', payload);
      alert('Notificación: ' + payload.mensaje); // Mostrar la notificación
    });*/
  }

  enviar(){
    this.buzonEnvio = this.myForm.getRawValue()
    console.log("mando--> ", this.buzonEnvio);

    this._buzonService.create(this.buzonEnvio).subscribe({
      next:(data: BuzonResponse) => {
        //this.websocketService.emit("notificacion")
        //this.websocketService.emit("notificacionn");
        this.websocketService.emit("notificacion", data)

        console.log("recibo: ", data);

        Swal.fire({
          title: "Gracias por contactarse con nosotros, le mandaremios un mensaje a su email.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });
      },
      error:()=>{
        alert("No se pudo mandar");
      },
      complete:()=>{

      }
    })
  }
}
