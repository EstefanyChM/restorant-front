export class EmpresaRequest {
  id: number = 0;
  razonSocial: string = "";
  ruc: string= "";
  direccion?: string= "";
  telefono?: string= "";
  correo?: string= "";
  urllogo?: string= "";
  horaApertura?: string= ""; // En TypeScript, no hay un tipo específico para `TimeSpan`. Usualmente se usa `string` o `number` para representar tiempos.
  horaCierre?: string= "";
}
