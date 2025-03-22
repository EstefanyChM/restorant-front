import { Component, OnInit } from '@angular/core';
import { ServicioResponse } from 'src/app/private/empresa/models/servicio-response.model';
import { NuestrosServiciosService } from 'src/app/private/empresa/service/nuestros-servicios.service';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent implements OnInit{
  nuestrosServiciosObtenidos! : ServicioResponse[]

  constructor(
    private _nuestrosServicios: NuestrosServiciosService
  ){}

  ngOnInit(): void {
    this._nuestrosServicios.getAll().subscribe(
      response => {this.nuestrosServiciosObtenidos = response} ,
      error => {}
    )
  }
}
