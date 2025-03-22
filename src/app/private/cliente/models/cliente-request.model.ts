export class ClienteRequest {
  id: number = 0;
  idPersonaNatural: number = 0;
  nombre: string = "";
  apellidos: string = "";
  fechaNacimiento: Date = new Date();
  email: string = "";
  celular: string = "";
  idPersonaTipoDocumento: number = 0;
  numeroDocumento: string = "";
  direccion: string = "";
  estado: boolean = false;
}
