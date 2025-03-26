import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteResponse } from '../../../models/cliente-response.model';
import { ClienteRequest } from '../../../models/cliente-request.model';
import { alert_error, alert_success, convertToBoolean } from 'src/app/shared/functions/general.functions';
import { GenericFilterRequest } from 'src/app/core/models/generic-filter-request.model';
import { PersonaResponse } from 'src/app/private/shared/models/persona-response.model';
import { PersonaService } from 'src/app/private/shared/services/persona.service';
import { LegalCustomerRequest } from '../../../models/legal-customer-request';
import { ClienteService } from '../../../service/cliente.service';
import { SharedClienteService } from 'src/app/private/shared/services/shared-cliente-service.service';
import { LegalCustomerResponse } from '../../../models/legal-customer-response';
import { PersonalEmpresaService } from 'src/app/private/personal/service/personal-empresa.service';

@Component({
  selector: 'app-cli-cliente-register',
  templateUrl: './cli-cliente-register.component.html',
  styleUrls: ['./cli-cliente-register.component.scss']
})
export class CliClienteRegisterComponent implements OnInit {

  request: GenericFilterRequest = new GenericFilterRequest();

  /*
  *TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() accion: number = 0;

  /*
  *TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();
  @Output() idClienteEmitido = new EventEmitter<number>();
  @Output() tipoComprobante = new EventEmitter<number>();

  @Output() clienteRegistrado = new EventEmitter<boolean>();
  @Output() personalRegistrado = new EventEmitter<boolean>();
  @Input() verOrigen: string = "";


  myForm: FormGroup;
  myFormLegalCustomer: FormGroup;
  myFormConsult: FormGroup;
  selectedDocumento: number = 3; // Valor inicial por defecto

  clienteResponse: ClienteResponse | null = null;
  personaResponse: PersonaResponse | null = null;

  clienteEnvio: ClienteRequest = new ClienteRequest();
  clienteJuridicoEnvio: LegalCustomerRequest = new LegalCustomerRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */
  idClienteBack: number = 0;
  clientes: any[] = []; // Inicialización aquí

  tipoDocumentos: any[] = [
    { label: 'DNI', value: 1 },
    { label: 'RUC', value: 2 },
    { label: 'Carné de extranjería', value: 3 },
    { label: 'Pasaporte', value: 4 },
  ];

  constructor(
    private fb: FormBuilder,
    private _personaService: PersonaService,
    private _clienteService: ClienteService,
    private _sharedClienteService:SharedClienteService,
    private _personalEmpresaService: PersonalEmpresaService

  ) {
    //formulario para la consulta según documento
    this.myFormConsult = this.fb.group(
      {
        idPersonaTipoDocumento: [null, [Validators.required]],
        numeroDocumento: [null, [Validators.required]],
      });

    // Escuchar cambios en el tipo de documento
    this.myFormConsult.get('idPersonaTipoDocumento')?.valueChanges.subscribe((value) => {
      this.selectedDocumento = value; // Aquí actualizas el valor de selectedDocumento
      this.updateDocumentoValidator(value);
    });

    this.myForm = this.createClientForm();
    this.myFormLegalCustomer = this.createLegalCustomerForm();
  }



  // Método para actualizar la validación según el tipo de documento seleccionado
  updateDocumentoValidator(tipoDocumento: number) {
    const numeroDocumentoControl = this.myFormConsult.get('numeroDocumento');
    switch (tipoDocumento) {
      case 1:
        // DNI (8 dígitos)
        numeroDocumentoControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')]);
        break;
      case 2:
        // RUC (11 dígitos)
        numeroDocumentoControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{11}$')]);
        break;
      case 3:
        // Carné de extranjería (9 dígitos)
        numeroDocumentoControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{9}$')]);
        break;
      default:
        // Pasaporte (sin restricción de longitud, solo requerido)
        numeroDocumentoControl?.setValidators([Validators.required]);
        break;
    }
    // Refrescar la validación del campo
    numeroDocumentoControl?.updateValueAndValidity();
  }

  getDocumentoLength(): number {
    const tipoDocumento = this.myFormConsult.get('idPersonaTipoDocumento')?.value;
    switch (tipoDocumento) {
      case 1:
        return 8; // DNI
      case 2:
        return 11; // RUC
      case 3:
        return 9; // Carné de extranjería
      default:
        return 0; // Pasaporte (no tiene restricción)
    }
  }

  ngOnInit(): void {
    console.log('origen: ', this.verOrigen);
  }

  onDocumentoChange(event: any) {
    this.selectedDocumento = event.target.value;
  }

  consultarPersona(event: any) {
    const idPersonaTipoDocumento = this.myFormConsult.get('idPersonaTipoDocumento')?.value;
    const numeroDocumento = this.myFormConsult.get('numeroDocumento')?.value;

    this._personaService.consultarPersona(idPersonaTipoDocumento, numeroDocumento).subscribe({
      next: (result: PersonaResponse) => {
        this.personaResponse = result;
        console.log(this.personaResponse);
        switch (idPersonaTipoDocumento) {
          case 2:
            this.actualizarFormularioPersonaConRUC( this.personaResponse);
            break;
          default:
            this.actualizarFormulario( this.personaResponse);
            break;
        }
      },
      error: (err) => {
        this.personaResponse = new PersonaResponse
        this.personaResponse.idPersonaTipoDocumento = idPersonaTipoDocumento;
        switch (idPersonaTipoDocumento) {
          case 2:
            this.personaResponse.ruc=numeroDocumento
            this.actualizarFormularioPersonaConRUC( this.personaResponse);
            console.log('mando: ', this.personaResponse);

            break;
          default:
            this.personaResponse.numeroDocumento=numeroDocumento;
            this.actualizarFormulario( this.personaResponse);
            break;
        }
        alert_error('Persona no encontrada','La Persona no se encuentra registrada en el sistema')}
    });
  }

  actualizarFormulario(personaResponse: PersonaResponse) {
    this.myForm.patchValue({
      idPersonaNatural: personaResponse.idPersonaNatural,
      idPersonaTipoDocumento: personaResponse.idPersonaTipoDocumento,
      numeroDocumento: personaResponse.numeroDocumento,
      nombre: personaResponse.nombre,
      apellidos: personaResponse.apellidos,
      celular: personaResponse.celular,
      email: personaResponse.email,
      fechaNacimiento: personaResponse.fechaNacimiento,
      direccion: personaResponse.direccion,
    });
  }

  actualizarFormularioPersonaConRUC(personaResponse: PersonaResponse) {
    this.myFormLegalCustomer.patchValue({
      idPersonaTipoDocumento: personaResponse.idPersonaTipoDocumento,
      ruc: personaResponse.ruc,
      razonSocial: personaResponse.razonSocial,
      nombreComercial: personaResponse.nombreComercial,
      tipo: personaResponse.tipo,
      estado: personaResponse.estado,
      condicion: personaResponse.condicion,
      direccion: personaResponse.direccion,
      departamento: personaResponse.departamento,
    });
  }



  createClientForm(): FormGroup {
    return this.fb.group({
      idPersonaNatural: [this.personaResponse?.idPersonaNatural, []],
      nombre: [null, Validators.required],
      apellidos: [null, Validators.required],
      fechaNacimiento: [null, []],
      email: [null, []],
      celular: [null, []],
      idPersonaTipoDocumento: [{ value: null, disabled: true }, Validators.required],  // Deshabilitar el campo
      numeroDocumento: [{value:null, disabled: true }, Validators.required],
      direccion: [null, []],
    });
  }


  createLegalCustomerForm(): FormGroup {
    return this.fb.group({
      idPersonaJuridica: [this.personaResponse?.idPersonaJuridica,],
      razonSocial: [null, Validators.required],
      nombreComercial: [null, []],
      tipo: [null, []],
      estado: [null, []],
      condicion: [null, []],
      direccion: [null, []],
      departamento: [null, []],
      provincia: [null, []],
      distrito: [null, []],
      ubigeo: [null, []],
      idPersonaTipoDocumento: [{ value: null, disabled: true }, Validators.required],
      ruc: [{value:null, disabled: true }, Validators.required],
    })
  }

  guardar(event: any) {
    this.clienteEnvio = this.myForm.getRawValue(),
    this.clienteEnvio.idPersonaNatural = this.personaResponse?.idPersonaNatural ?? 0;

    this.clienteJuridicoEnvio = this.myFormLegalCustomer.getRawValue()

    this.clienteJuridicoEnvio.idPersonaJuridica = this.personaResponse?.idPersonaJuridica ?? 0;
    console.log('mando: ',this.clienteEnvio);

    switch(this.myFormConsult.get('idPersonaTipoDocumento')?.value){
      case 2:
        console.log('tons', this.clienteJuridicoEnvio);
        this._clienteService.createLegalCustomer(this.clienteJuridicoEnvio).subscribe({

          next:(data:LegalCustomerResponse)=>{
            this.idClienteBack = data.id;
            this.idClienteEmitido.emit(this.idClienteBack);
            this.tipoComprobante.emit(2);
            this._sharedClienteService.setLegalCustomerResponse(data);
            this.clienteRegistrado.emit(true);

          },
          error:()=>{},
          complete:()=>{
            console.log("El proceso ha finalizado"); // Útil para saber que el flujo ha terminado
          }
        });
        break;
      default:
        if(this.verOrigen != 'Modulo Venta'){

          this._personalEmpresaService.create(this.clienteEnvio).subscribe({
            next:()=>{alert_success('Registro exitoso', 'El personal ha sido registrado'), this.personalRegistrado.emit(false);},
            error:()=>{},
            complete:()=>{}
          });
        }
        else{
          //this.clienteEnvio.idPersonaNatural = this.personaResponse?.idPersonaNatural;
          this._clienteService.createNaturalCustomer(this.clienteEnvio).subscribe({
            next:(data:ClienteResponse)=>{

              console.log("SE GUARDO a la persona:" , data);
                this.idClienteBack = data.id;
                this.idClienteEmitido.emit(this.idClienteBack);
                this.tipoComprobante.emit(1);
                this._sharedClienteService.setClienteResponse(data);
                this.clienteRegistrado.emit(true);
            },
            error:()=>{},
            complete:()=>{}
          });
        }
          break;
    }
  }
}

