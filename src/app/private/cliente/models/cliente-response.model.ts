export class ClienteResponse {
  id: number = 0;
  idPersona: number = 0;
  nombre: string = "";
  apellidos: string = "";
  nombreCompleto: string = "";
  fechaNacimiento: Date = new Date();
  email: string = "";
  celular: string = "";
  idPersonaTipoDocumento: number = 0;
  numeroDocumento: string = "";
  direccion: string = "";
  estado: boolean = false;
}
