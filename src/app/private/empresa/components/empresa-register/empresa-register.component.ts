import { Component, EventEmitter, Input,Output, OnInit } from '@angular/core';
import { EmpresaResponse } from '../../models/empresa-response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmpresaService } from '../../service/empresa.service';


@Component({
  selector: 'app-empresa-register',
  templateUrl: './empresa-register.component.html',
  styleUrls: ['./empresa-register.component.scss']
})
export class EmpresaRegisterComponent implements OnInit{
  @Input() title: string = "";
  @Input() empresa: EmpresaResponse = new EmpresaResponse;
  @Input() accion: number = 0;

  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm:FormGroup;

  constructor(private fb: FormBuilder, private _empresaService:EmpresaService)
  {
    this.myForm = this.fb.group({
      id: [{value:0, disabled: true}, [Validators.required]],
      razonSocial:[null, [Validators.required]],
      ruc:[null, [Validators.required]],
      direccion:[null, [Validators.required]],
      telefono:[null, [Validators.required]],
      correo:[null, [Validators.required]],
      urllogo:[null, [Validators.required]],
      horaApertura:[null, [Validators.required]],
      horaCierre:[null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.empresa);
  }


}
