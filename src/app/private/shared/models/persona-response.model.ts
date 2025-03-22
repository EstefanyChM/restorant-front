export class PersonaResponse {
    id: number = 0;
    idPersonaTipoDocumento: number = 0;
    numeroDocumento: string = "";
    nombre: string = "";
    apellidos: string = "";
    fechaNacimiento: string = "";
    email: string = "";
    celular: string = "";
    direccion: string = "";
    idEstado: boolean = false;
    idPersonaNatural: number = 0;


    /*********************** */
    //HAY QUE CREAR OTRA CLASE PARA PERSONA JURIDICA, ME DA WEA, ACÁ NOMAS
    idPersonaJuridica: number = 0;
  ruc: string = "";
  razonSocial: string = "";
  nombreComercial: string = "";
  tipo: string = "";
  estado: string = "";
  condicion: string = "";
  //direccion: string = "";
  departamento: string = "";
  provincia: string = "";
  distrito: string = "";
  ubigeo: string = "";
  capital: string = "";
  //idPersonaTipoDocumento: number = 0;
}
