
export interface HorarioAtencionRequest {
  id: number;
  diaSemana: string;
  horaApertura: string;  // Representada como string (HH:mm)
  horaCierre: string;    // Representada como string (HH:mm)
}
