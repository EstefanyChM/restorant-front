import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BuzonResponse } from '../../../models/buzon-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuzonRequest } from '../../../models/buzon-request.model';
import { BuzonService } from '../../../service/buzon.service';

@Component({
  selector: 'app-colec-buzon-reply',
  templateUrl: './colec-buzon-reply.component.html',
  styleUrls: ['./colec-buzon-reply.component.scss']
})
export class ColecBuzonReplyComponent implements OnInit {
  @Input() title: string = "";
  @Input() buzon: BuzonResponse = new BuzonResponse();
  @Input() accion: number = 0;

  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;
  buzonEnvio: BuzonRequest =new BuzonRequest();

  constructor(private buzonService: BuzonService, private fb: FormBuilder){
    this.myForm = this.fb.group({

    })
  }




  ngOnInit(): void {


  }

}
