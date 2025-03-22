import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuscripcionRequest } from 'src/app/private/colecciones/models/suscripcion-request.model';
import { SuscripcionResponse } from 'src/app/private/colecciones/models/suscripcion-response.model';
import { SuscripcionService } from 'src/app/private/colecciones/service/suscripcion.service';
import { EmpresaResponse } from 'src/app/private/empresa/models/empresa-response';
import { EmpresaService } from 'src/app/private/empresa/service/empresa.service';

@Component({
  selector: 'app-template-footer',
  templateUrl: './template-footer.component.html',
  styleUrls: ['./template-footer.component.scss']
})


export class TemplateFooterComponent implements OnInit {
  myFormSubscription: FormGroup;
  datosDeEmpresa: EmpresaResponse[] = [];
  susbcripcionEnviar: SuscripcionRequest = new SuscripcionRequest;
  isSubmitted: boolean = false;  // Agregar propiedad para el estado de envío

  constructor(
    private _empresaService: EmpresaService,
    private _suscripcionService: SuscripcionService,
    private fb: FormBuilder
  ) {
    this.myFormSubscription = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this._empresaService.getAll().subscribe({
      next: (data: EmpresaResponse[]) => this.datosDeEmpresa = data,
      error: () => {},
      complete: () => []
    });
  }

  subscribirse() {
    this.isSubmitted = true;  // Marcar el formulario como enviado
    if (this.myFormSubscription.valid) {
      this.susbcripcionEnviar = this.myFormSubscription.getRawValue();
      this._suscripcionService.create(this.susbcripcionEnviar).subscribe({
        next: (data: SuscripcionResponse) => {
          this.myFormSubscription.reset();
        },
        error: () => {},
        complete: () => {}
      });
    }
  }
}
