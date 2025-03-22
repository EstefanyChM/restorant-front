import { HorarioAtencionResponse } from "./horario-atencion-response.model";

export class EmpresaResponse {
  id: number = 0;
  razonSocial: string = "";
  ruc: string= "";
  direccion: string= "";
  telefono: string= "";
  correo: string= "";
  urllogo?: string= "";

  horarios: HorarioAtencionResponse[] = [];

}
