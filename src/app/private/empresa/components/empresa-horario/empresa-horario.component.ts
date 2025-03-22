import { Component, OnInit } from '@angular/core';
import { HorarioAtencionResponse } from '../../models/horario-atencion-response.model';
import { HorarioAtencionService } from '../../service/horario-atencion.service';
import { HorarioAtencionRequest } from '../../models/horario-atencion-request.model';
import { format } from 'date-fns';
/************************* */

@Component({
  selector: 'app-empresa-horario',
  templateUrl: './empresa-horario.component.html',
  styleUrl: './empresa-horario.component.scss'
})

export class EmpresaHorarioComponent implements OnInit{
  horarioDialog: boolean = false;
  horariosDeAtencionRecibido!: HorarioAtencionResponse[]
  horarioSeleccionado!: HorarioAtencionRequest


  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private _horarioAtencionService: HorarioAtencionService
  ) {}

  ngOnInit() {
    this.listar();
  }

   listar() {
      this._horarioAtencionService.getAll().subscribe({
        next: (data: HorarioAtencionResponse[]) => {
          this.horariosDeAtencionRecibido = data;
          console.log(data);

        },
        error: () => {
          console.log("Error al llamar los horarios");
        },
        complete: () => {
          console.log("Lllamado finalizado");
        },
      });
    }


    editarHorario(seleccionado: HorarioAtencionRequest) {
    this.horarioSeleccionado = { ...seleccionado };
    console.log('seleccio: ', this.horarioSeleccionado);
      this.horarioDialog = true;
  }

  hideDialog() {
      this.horarioDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;
      if (typeof this.horarioSeleccionado.horaApertura !== 'string') {
        this.horarioSeleccionado.horaApertura = this.darFormatoHHMMA(this.horarioSeleccionado.horaApertura);
      }
      if (typeof this.horarioSeleccionado.horaCierre !== 'string') {
        this.horarioSeleccionado.horaCierre = this.darFormatoHHMMA(this.horarioSeleccionado.horaCierre);
      }
      console.log('voa a mandar: ',this.horarioSeleccionado);

      this._horarioAtencionService.update(this.horarioSeleccionado).subscribe({
        next: ()=>{this.listar(), this. horarioDialog = false },
        error: () => {
          console.log("Error al llamar los horarios");
        },
        complete: () => {
          console.log("Lllamado finalizado");
        },
      })

  }

  darFormatoHHMMA(hora: string): string {

    console.log('convirtiendo: ', hora);

    return format(hora, "hh:mm a"); // Convierte Date a formato "10:00 PM"
  }

  errorHorario: boolean = false;

validarHoras() {
  if (this.horarioSeleccionado.horaApertura && this.horarioSeleccionado.horaCierre) {
    const apertura = new Date(this.horarioSeleccionado.horaApertura).getTime();
    const cierre = new Date(this.horarioSeleccionado.horaCierre).getTime();

    if (cierre <= apertura) {
      this.errorHorario = true;
      //this.horarioSeleccionado.horaCierre = ''; // Resetea la hora de cierre si es inválida
    } else {
      this.errorHorario = false;
    }
  }
}



}
