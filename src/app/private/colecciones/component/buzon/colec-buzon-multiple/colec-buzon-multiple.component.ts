import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuzonRequest } from '../../../models/buzon-request.model';
import { BuzonService } from '../../../service/buzon.service';
import { BuzonResponse } from '../../../models/buzon-response.model';

@Component({
  selector: 'app-colec-buzon-multiple',
  templateUrl: './colec-buzon-multiple.component.html',
  styleUrls: ['./colec-buzon-multiple.component.scss']
})
export class ColecBuzonMultipleComponent implements OnInit {

  form: FormGroup;
  buzonesBack: BuzonResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _buzonService: BuzonService
  ) {
    this.form = this.fb.group({
      buzones: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._buzonService.getAll().subscribe({
      next: (data: BuzonResponse[]) => {
        this.buzonesBack = data;

        this.buzonesBack.forEach(x => {
          let buzon = this.nuevoBuzon(x);
          this.buzonesArrayForm.push(buzon);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get buzonesArrayForm(): FormArray { return this.form.get("buzones") as FormArray };




  addBuzon() {

    let buzon = this.nuevoBuzon(new BuzonResponse())
    this.buzonesArrayForm.push(buzon);
  }

  nuevoBuzon(buzon: BuzonResponse) {
    return this.fb.group({
      id: [{ value: buzon.id, disabled: true }, [Validators.required]],
      nombre: [buzon.asuntoNombre, [Validators.required]],
      email: [buzon.remiteEmail, [Validators.required, Validators.email]], // Agregué Validators.email si es necesario validar el formato de email
      mensaje: [buzon.mensaje, [Validators.required]],
      fechaHora: [{ value: new Date(), disabled: true }], // Asigna directamente la fecha y hora actual
      idEstado: [{ value: buzon.estado, disabled: true }, [Validators.required]],
    })
  }

  removeBuzon(i: number) {
    this.buzonesArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}
