import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmpresaResponse } from '../../models/empresa-response';
import { EmpresaService } from '../../service/empresa.service';
import { AccionMantConst } from 'src/app/core/constants/general.constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-empresa-dates',
  templateUrl: './empresa-dates.component.html',
  styleUrl: './empresa-dates.component.scss'
})
export class EmpresaDatesComponent implements OnInit {

  empresaBack: EmpresaResponse[] = [];
  empresaSelected: EmpresaResponse = new EmpresaResponse();
  titleModal: string = "";
  accionModal: number = 0;
  modalRef? : BsModalRef;

  constructor(private _empresaService: EmpresaService, private modalService: BsModalService) {}

  ngOnInit(): void {
      this.listarEmpresa();
  }

  listarEmpresa(){
    this._empresaService.getAll().subscribe({
      next: (data: EmpresaResponse[]) => {
        this.empresaBack = data;
      },
      error:() => {},
      complete: () => {}
    });
  }

  editarEmpresa( template: TemplateRef<any>, empresa: EmpresaResponse){
    this.empresaSelected = new EmpresaResponse();
    this.titleModal = "EDITAR LOS DATOS DE LA EMPRESA";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) this.listarEmpresa();
  }
}
