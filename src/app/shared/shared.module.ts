import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FooterConnectionComponent } from './components/footer-connection/footer-connection.component';


import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { TabMenuModule } from 'primeng/tabmenu';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';

import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumber } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TreeSelectModule } from 'primeng/treeselect';

import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [
      FooterConnectionComponent,
      ProductsDetailsComponent
    ],
    exports: [
      InputIconModule,
      IconFieldModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule,
      PaginationModule,
      FooterConnectionComponent,

      TableModule,
      MenuModule,
      ChartModule,

      TabMenuModule,

      InputTextModule,
      ButtonModule,
      CardModule,
      InputGroupModule,
      InputGroupAddonModule,
      AutoCompleteModule,
      DropdownModule,
      CalendarModule,
      InputNumberModule,
      FileUploadModule,
      ProductsDetailsComponent,
      MessagesModule,
      PasswordModule,
      CheckboxModule,
      DataViewModule,
      PickListModule,
      OrderListModule,
      RatingModule,
      DialogModule,
      FloatLabelModule,
      MultiSelectModule,
      SliderModule,
      PaginatorModule,
      ProgressSpinnerModule,
      InputNumber,
      OverlayPanelModule,
      BadgeModule,
      ToastModule,
      ToolbarModule,
      TagModule,
      ConfirmDialogModule,
      TreeSelectModule


    ],
    imports: [

      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot(), // ==> sin este no podemos consumir ningun servio web
      PaginationModule.forRoot(),

      TableModule,
      MenuModule,
      ChartModule,

      TabMenuModule,

      InputTextModule,
      ButtonModule,
      CardModule,
      InputGroupModule,
      InputGroupAddonModule,
      AutoCompleteModule,
      DropdownModule,
      CalendarModule,
      InputNumberModule,
      FileUploadModule,
      InputIconModule,
      IconFieldModule,
      MessagesModule,
      PasswordModule,
      CheckboxModule,
      DataViewModule,
      PickListModule,
      OrderListModule,
      RatingModule,
      DialogModule,
      FloatLabelModule,
      MultiSelectModule,
      SliderModule,
      PaginatorModule,




    ],

    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      ConfirmationService, MessageService

    ]
  })



export class SharedModule { }
