export class PersonalEmpresaRequest {
  id: number = 0;
  idPersonaNatural: number = 0;
  nombre: string = '';
  apellidos: string = '';
  fechaNacimiento?: Date;
  celular?: string;
  direccion?: string;
  numeroDocumento: string = '';
  idPersonaTipoDocumento: number = 0;
}
