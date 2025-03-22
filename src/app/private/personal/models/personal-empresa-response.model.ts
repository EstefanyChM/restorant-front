
export class PersonalEmpresaResponse {
  id: number = 0;
  idPersonaNatural: number = 0;
  nombre: string = '';
  apellidos: string = '';
  fechaNacimiento?: Date | null = null;
  celular?: string | null = null;
  direccion?: string | null = null;
  numeroDocumento: string = '';
  idPersonaTipoDocumento: number = 0;
  email?: string | null = null;

  // Propiedad para almacenar los roles del usuario
  userRoles: Array<{ userId: string; roleId: string }> = [];

  rolesNombre: string[] = [];

}


