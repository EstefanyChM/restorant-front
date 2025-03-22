import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorarioAtencionService } from 'src/app/private/empresa/service/horario-atencion.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HorarioGuard implements CanActivate {
  constructor(private horarioService: HorarioAtencionService , private router: Router) {}

   // Función para convertir el formato AM/PM a minutos desde medianoche
   convertirAMPMaMinutos(hora: string): number {
    const [horaParte, minutosParte] = hora.split(':');
    const [minutos, periodo] = minutosParte.split(' '); // "AM" o "PM"
    let horas = parseInt(horaParte);
    const minutosTotales = parseInt(minutos);

    if (periodo === 'PM' && horas !== 12) {
      horas += 12; // Si es PM y no es la hora 12, sumamos 12
    } else if (periodo === 'AM' && horas === 12) {
      horas = 0; // Si es AM y la hora es 12, la convertimos en 0 (medianoche)
    }

    return horas * 60 + minutosTotales;
  }

  // Método canActivate
  canActivate(): Observable<boolean> {
    const dayOfWeek = new Date().getDay(); // Obtiene el día de la semana (0 = domingo, 6 = sábado)
    const dayId = this.mapDayToId(dayOfWeek); // Aquí tienes que implementar tu método `mapDayToId` si aún no lo tienes

    return this.horarioService.getById(dayId).pipe(
      map((horario) => {
        const ahora = new Date();
        const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

        // Convierte los horarios de apertura y cierre de 12 horas AM/PM a minutos
        const inicioEnMinutos = this.convertirAMPMaMinutos(horario.horaApertura);
        const finEnMinutos = this.convertirAMPMaMinutos(horario.horaCierre);

        const dentroDelHorario = horaActual >= inicioEnMinutos && horaActual <= finEnMinutos;

        if (!dentroDelHorario) {
          Swal.fire({
            title: `Lo sentimos, nuestro Horario de Atención de hoy es de ${horario.horaApertura} - ${horario.horaCierre}`,
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

          this.router.navigate(['/']);
        }

        return dentroDelHorario;
      })
    );
  }



  private mapDayToId(dayOfWeek: number): number {
    // Mapea los días de la semana (0 = domingo, 6 = sábado) a tu sistema de IDs (lunes = 1, domingo = 7)
    const daysMap: { [key: number]: number } = {
      0: 7, // Domingo -> ID 7
      1: 1, // Lunes -> ID 1
      2: 2, // Martes -> ID 2
      3: 3, // Miércoles -> ID 3
      4: 4, // Jueves -> ID 4
      5: 5, // Viernes -> ID 5
      6: 6  // Sábado -> ID 6
    };

    return daysMap[dayOfWeek]; // Devuelve el ID correspondiente
  }
}
