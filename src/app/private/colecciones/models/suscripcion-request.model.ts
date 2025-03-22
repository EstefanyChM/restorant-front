export class SuscripcionRequest {
  id: number = 0;
    email: string = "";

    estado: boolean = false;
    fechaSuscripcion: Date = new Date();
    fechaDesuscripcion?: Date = new Date();

}
