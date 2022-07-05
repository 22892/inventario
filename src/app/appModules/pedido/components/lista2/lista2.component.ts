import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/es';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Observable} from 'rxjs';
import * as XLSX from 'xlsx'
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import {FormBuilder,FormControl,FormGroup,ValidationErrors,Validators,} from '@angular/forms';
import { GlobalserviceService } from '../../../../core/globalservice.service'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { SpinerService } from '../../../../core/spiner.service'
import { saveAs } from "file-saver";


interface ColumnItem {
  
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  width:string;

}

interface ColumnItemVin {
  
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  width:string;
  color: any;
  color2: any;
  colnum: any;
}



@Component({
  selector: 'app-lista2',
  templateUrl: './lista2.component.html',
  styleUrls: ['./lista2.component.scss']
})
export class Lista2Component implements OnInit {

  listOfColumns: ColumnItem[] = [
    {
      width: '80px',
      name: 'Unit Order No',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width: '50px',
      name: 'Vin',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'50px',
      name: 'Motor',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Marca',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
   
    {
      width:'50px',
      name: 'Familia',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      width: '50px',
      name: 'Versión',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
   
    {
      width:'80px',
      name: 'Fecha Creación',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Pack(año-mes)',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Año Producción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Mes Producción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Fecha LLegada',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Nombre Buque',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Año Modelo',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SSC',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Grade',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'OCN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Código color Ext',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Nombre Color Exterior',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Código SAP color Ext',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Descripción color SAP',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Código color Int',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Material',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Lote',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Orden compra',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
  ];


  listOfColumnsLista: ColumnItemVin[] = [
   /* {
      width: '40px',
      name: 'Datos Enviados',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },*/
    {
      width: '40px',
      name: 'Color Interior Color Exterior',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
   /* {
      width: '70px',
      name: 'Vin',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },*/
  
    {
      width:'40px',
      name: 'Modelo',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
   
    {
      width:'60px',
      name: 'Versión',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
    {
      width:'60px',
      name: 'Año',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
    
    {
      width:'60px',
      name: 'Chasis',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
    {
      width:'60px',
      name: 'Motor',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
    {
      width:'40px',
      name: 'Consecionario',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },

    {
      width:'40px',
      name: 'Vitrina',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
   
    {
      width:'50px',
      name: 'Estado Actual',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.estadoActual.estadoEtapa.est_id_padre - b.estadoActual.estadoEtapa.est_id_padre,
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: (list: number[], item: any) => list.some(ban => item.estadoActual.estadoEtapa.est_id_padre == ban),      
      filterMultiple: true,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
    {
      width:'80px',
      name: 'Trazabilidad',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },
   
    {
      width:'50px',
      name: 'Detalle',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },

    {
      width:'50px',
      name: 'Observación',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },

    {
      width:'50px',
      name: 'Reporte',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
      color: 'black',
      color2: 'white',
      colnum: '1'
    },

  ];

  listOfColumnsFactura: ColumnItem[] = [
    {
      width: '80px',
      name: 'SOC',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width: '50px',
      name: 'FACTURA',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'50px',
      name: 'T_DOC',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FEC_FACT',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
   
    {
      width:'50px',
      name: 'NUM_PED',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      width: '50px',
      name: 'SOLIC',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
   
    {
      width:'80px',
      name: 'NIF',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'NOMBRE RESP.',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'NOMBRE 2 RESP.',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'MATERIAL',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'DESCRIPCIÓN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CANT_FACT',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'DOC_VENTA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SECTOR',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CENTRO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'REFERENCIA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'REF_FICO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'MONEDA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'IMP_FINAL',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR_NETO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR_VENTA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR_DS',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR TOTAL',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SUBTOTAL 4',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SUBTOTAL 5',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SUBTOTAL 6',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR DESCUENTO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'PV CLIENTE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'DESCUENTO NETO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'INTERES',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR IVA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'ORG VENTA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'COND PAGO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CL VALOR AC',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'BULTOS',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CANAL',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'VIN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'TIPO CAMBIO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
  ];


  listOfColumnsNacionalizacion: ColumnItem[] = [
    {
      width: '50px',
      name: 'ITEM',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width: '50px',
      name: 'MES ARRIBO MV',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'50px',
      name: 'COBRO USO LIBERACIÓN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FACTURA PORTEO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
   
    {
      width:'50px',
      name: 'NUM NACIONALIZACIÓN',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      width: '50px',
      name: 'OC SAP',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
   
    {
      width:'60px',
      name: 'ENTREGA ENTRANTE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'60px',
      name: 'ZGRE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'BUQUE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'B/L No.',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FACTURA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA FACTURA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'TIPO / FAMILIA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'VIN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'MOTOR',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'LOTE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'AÑO PRODUCCIÓN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'AÑO MODELO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FSC FABRICA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'MATERIAL',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'COD COLOR FAB',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'COD COLOR SAP',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'COLOR',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR FOB USD',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FLETE USD',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SEGURO USD',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'RI',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FCHA B/L',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'TRM FECHA - FACTURA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FEC LLGADA BUQUE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'DIAS DE TRANSITO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR IVA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA LLEGADA DATOS',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA ENTREGA DCT',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA SOLICITUD NACIONAL.',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'DECLACIÓN IMPORTACIÓN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA PRESENTACIÓN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'NUMERO DE STICKER',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA DE PAGO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'NUMERO DE LEVANTE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FECHA LEVANTE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'SUBPARTIDA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CEPD',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'TIPO DE CARROCERIA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CLASE DE VEHICULO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'NUM DE PUERTAS',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'NUM PASAJERO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CILINDRADA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'POTENCIA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'PESO BRUTO KG',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'CID DOLARES',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'TRM NACIONALIZACIÓN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'VALOR CIF',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'BASE ARANCEL',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: '% ARACNCEL PAGAR',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'GRAVAMEN (PESOS)',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: '% IVA A PAGAR',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'TOTAL IVA COP',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'TOTAL IMPUESTOS COP',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'PAGO OEA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'PAIS COMPRA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'PAIS ORIGEN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'PUERTO EMBARQUE',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'PUERTO ARRIBO',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'FEC VENCE R.M',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'L/C',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
  ];

  listOfColumnsEstados: ColumnItemVin[] =[


  ]



  listVinAux: any[] = [];
  //listVin: any[] = [{veh_url_img_modelo: '', veh_cod_color_ext: 'HGT', veh_cod_color_int: 'NUYT', veh_modelo: 'HUNFAI', veh_version: 'CRETA', veh_anio: '2013', veh_vin:'HYGHGFVFGFGHG', veh_motor: 'hGGG',
  //estadoActual:{est_nombre: 'Nuevo'}  }];
  listVin: any[] = []
  vin$!: Observable<any>;
  cargarPedido: boolean = false

  listExcel: any[] = []


  desde!: Date;
  hasta!: Date;
  mode = 'date';

  fileList: NzUploadFile[] = [];
  typeFile: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  jsontext: any
  file!: File
  arrayBuffer: any
  buscarPedido: any
  estadoExcel: boolean = false
  sub:any
  modalCreate: boolean = false
  vinForm!: FormGroup;
  isLoadingUploadExcel: boolean = false

  listTotalExcel: any[] = [{exe_codigo: 1,exe_name: 'Pedido'}, {exe_codigo: 2,exe_name: 'Facturación'}, {exe_codigo: 3,exe_name: 'Nacionalización'}]
  tipoExcelItem: number = 1
  indexTipoExcel: any
  
  isModalExcelError: boolean = false
  listErrorExcel:  any[] = []
  isLoadingErrorExcel: boolean = false
  datos: any;

  listEstadoVin: any[] = [];
  estadovin$!: Observable<any>;
  cargandoEstado: boolean = false
  subEstado: any

  renviarVinCurbe: any[] = [];
  reenviarVin$!: Observable<any>;
  cargandoReenviar: boolean = false
  subReenvia: any


  listImagenesEstado: any
  isModalPedf: boolean = false
  filePdf: any
  totalEstados: any [] = []
  checkControl: boolean = false
  controlSi: boolean = true
  controlNo: boolean = false
  subFecha: any
  control: boolean = false
  controlFecha: boolean = false
  


  constructor(private msg: NzMessageService,
    private cdRef:ChangeDetectorRef,
    private router: Router,
    private servicePedido: PedidoService,
    private fb: FormBuilder,
    private serviceGlobal: GlobalserviceService,
    private serviceSpiner: SpinerService) {

      this.vinForm = this.fb.group({

        veh_motor: [null, [Validators.required]],
        veh_fecha_crea_pedido: [null, [Validators.required]],
        veh_pack: [null, [Validators.required]],
        veh_year_produccion: [null, []],
        veh_mes_produccion: [null, []],
        veh_fecha_llegada: [null, []],
        veh_nombre_buque: [null, [Validators.required]],
        veh_year_modelo: [null, [Validators.required]],
        veh_ssc: [null, [Validators.required]],
        veh_grade: [null, [Validators.required]],
        veh_ocn: [null, [Validators.required]],
        veh_cod_color_ext: [null, [Validators.required]],
        veh_nombre_color_ext: [null, [Validators.required]],
        veh_cod_sap_color_ex: [null, [Validators.required]],
        veh_des_color_sap: [null, [Validators.required]],
        veh_cod_color_int: [null, [Validators.required]],
        veh_lote: [null, [Validators.required]],
        veh_orden_compra: [null, [Validators.required]],
        veh_act_estado: [null, [Validators.required]],
        veh_act_fecha: [null, [Validators.required]],
        veh_act_observacion: [null, [Validators.required]],
        veh_rev_estado: [null, [Validators.required]],
        veh_rev_fecha: [null, [Validators.required]],
        veh_rev_observacion: [null, [Validators.required]],
        veh_marca: [null, [Validators.required]],
        veh_vin: [null, [Validators.required]],
      

      });
  

      this.desde = new Date()
      this.hasta = new Date()

      this.servicePedido.updateListaVins.subscribe( value => {

        if(value == true){
          console.log('Activa Vins');
          
          this.servicePedido.updateListAllVinMarca()
        }

      })

  }

  ngOnInit(): void {
    this.listImagenesEstado = this.serviceGlobal.getListImagesEstado()
    this.getListVins()
    this.getListEstadosVin()
    this.desde = this.serviceGlobal.getFechaDesde();
    this.hasta = this.serviceGlobal.getFechaHasta();
    this.indexTipoExcel = this.listTotalExcel[0]
  }


  chechselect(estado: any, posicion: any){


    setTimeout(() => {

      this.listVin[posicion].listaEstadosPadres.forEach((item: any)=>{
        if(item.est_codigo == estado.est_codigo){
          item.check = true
        }
      })
  
    }, 1)

    
  }


  inicio(){
    this.router.navigate(['/pedido/lista'])
    this.estadoExcel = false
  }

  realoadPedido(){
    this.desde = new Date()
    this.hasta = new Date()
    this.servicePedido.updateListAllVinMarca()
  }

  actualizarFecha(e: any) {
    if (!e) {
      
      this.serviceGlobal.setFechaDesde(this.desde);
      this.serviceGlobal.setfechaHasta(this.hasta);
      this.getListVinsFecha()

    }
  }

  submitForm(): void {
    for (const key in this.vinForm.controls) {
      this.vinForm.controls[key].markAsDirty();
      this.vinForm.controls[key].updateValueAndValidity();
    }
  }

  validateForms(): boolean {
    let v = true;
      if(!this.vinForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Vin");
        this.submitForm()
        return false;
      
      }

    return v;
  }


  beforeUpload = (file: any): boolean => {

    this.listExcel = []
    
    if (this.fileList.length > 0) {
      this.msg.error('Solo puede Cargar un Archivo');
    } else {
      this.fileList = this.fileList.concat(file);

     
        this.excelToJson(file)

    }

    return false;
  };

  


  public excelToJson(file: File){
   
    this.file= file;     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array(); 
     
         
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});  
      
    
      var first_sheet_name = workbook.SheetNames[0];  
      var worksheet = workbook.Sheets[first_sheet_name];    
      //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));  
      //var arraydatos =  XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
     
      this.listExcel = XLSX.utils.sheet_to_json(worksheet,{raw:true});   
      console.log(this.listExcel)      
    
    
    } 
  }

  openModalVin(){
    this.modalCreate = true

  }

  filtroBuscarPedido(){

    if (this.buscarPedido == '' || this.buscarPedido == null) {

      this.listVin = this.listVinAux

    }else{


    this.listVin = this.listVinAux.filter((item: any) => item.veh_vin.toUpperCase().indexOf(this.buscarPedido.toUpperCase()) !== -1 || item.veh_motor.toUpperCase().indexOf(this.buscarPedido.toUpperCase()) !== -1 || item.veh_modelo.toUpperCase().indexOf(this.buscarPedido.toUpperCase()) !== -1);

    }

  }

  visualizaSubirExcel(tipo: number){
    if(tipo == 1){
      this.estadoExcel = true
    }
    if(tipo == 2){
      this.estadoExcel = false
    }
  }


  getListEstadosVin(){

    this.estadovin$ = this.servicePedido.getListAllEstadosVin$()
    
    this.subEstado = this.estadovin$.subscribe(p => {
      console.log(p);
      
      this.listEstadoVin = p.listEstadoVin
      
      this.cargandoEstado = p.cargando

      if(this.cargandoEstado == false){


        let filtros = this.listEstadoVin.map(c => {
          return {text: c.est_nombre, value: c.est_codigo}
        });

       
       
        //@ts-ignore
        this.listOfColumnsLista.find(x => x.name == 'Estado Actual').listOfFilter = filtros;

       



        //OPCION 2222222 ///////////////////////////////////////
        

        
        //////////////////////////////////////


        this.subEstado.unsubscribe()

       
      }
    });


  }

  cambio(estado: any, index: any, lista: any){

    
    
    if(estado == 'si'){
      this.controlSi = false
     
    }

    if(estado == 'no'){

      if(this.controlSi == false){

      }else{
        if(index == lista){
          this.controlNo = true
        }else{

        }
  
      }

    }

    if(estado == 'reset'){
      this.controlSi = true
      this.controlNo = false
    }
    

    
  }


  getListVins(){


    this.vin$ = this.servicePedido.getListAllVinMarca$()
    
    this.sub = this.vin$.subscribe(p => {
      
      console.log('mmmmmmmmm');
      console.log(p);
      
      
      this.listVin = p.listVin
      this.listVinAux = p.listVin
      this.control = p.control

      this.cargarPedido = p.cargando

      if(this.cargarPedido == false){
       


        if(this.control){

          this.listVin.forEach((item, index)=>{
            
            if(item.veh_estado_subir_curbe == 1){
              item.estado_curbe = true
            }else{
              item.estado_curbe = false
            }
            item.veh_fecha_crea_pedido = this.transformDate(item.veh_fecha_crea_pedido)
            item.veh_fecha_llegada = this.transformDate(item.veh_fecha_llegada)
            item.estadoActual.veh_est_fecha = this.transformDate(item.estadoActual.veh_est_fecha)

            item.listaEstadosPadres.forEach((est: any)=>{
              est.check = true
            })


          })

          this.control = false

        }
       
      }

      console.log('lista vin');
      console.log(this.listVin);
      
     
      
    });

  }


  getListVinsFecha(){

    this.vin$ = this.servicePedido.getAllVinsFechas$()
    this.controlFecha = true
    this.sub = this.vin$.subscribe(p => {
      
      
      this.listVin = p.listVin
      this.listVinAux = p.listVin

      this.cargarPedido = p.cargando

      if(this.cargarPedido == false){

        
        if(this.controlFecha){
          
          this.listVin.forEach((item, index)=>{
              
            if(item.veh_estado_subir_curbe == 1){
              item.estado_curbe = true
            }else{
              item.estado_curbe = false
            }
            item.veh_fecha_crea_pedido = this.transformDate(item.veh_fecha_crea_pedido)
            item.veh_fecha_llegada = this.transformDate(item.veh_fecha_llegada)
            item.estadoActual.veh_est_fecha = this.transformDate(item.estadoActual.veh_est_fecha)

            item.listaEstadosPadres.forEach((est: any)=>{
              est.check = true
            })


          })
          this.controlFecha = false
        }
      }

      console.log('lista vin fecha');
      console.log(this.listVin);
      
     
      
    });


  }

  transformDate(newDate: any): any{
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    let fecha = dia + " de "+ mes +" del "+anio

    return fecha
  }

  createVinPedido(){

    this.modalCreate = false

  }

  uploadDataExcel(){

    var formdata = new FormData();

    this.fileList.forEach((file: any) => {
      formdata.append('files[]', file);
    });
    this.isLoadingUploadExcel = true;
    console.log('llega');
    
    if(this.tipoExcelItem == 1){

      this.servicePedido.uploadFileExelPedido(formdata).subscribe({
        next: (data) =>  {
          console.log('response');
          console.log(data);

          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
          }
          
        },
        error: (error) => {
          this.isLoadingUploadExcel = false;
          this.msg.error(`Ha ocurrido un error al subir el archivo Pedido, ${error.error.message}`);
        }
      });


    }

    if(this.tipoExcelItem == 2){

      this.servicePedido.uploadFileExelFactura(formdata).subscribe({
        next: (data)  => {
          console.log('response');
          
          console.log(data);
          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
          }
          
        },
        error: (err) => {
          this.isLoadingUploadExcel = false;
          this.msg.error(`Ha ocurrido un error al subir el archivo Facturación, ${err.error.message}`);
        }
     });


    }

    if(this.tipoExcelItem == 3){

      this.servicePedido.uploadFileExelNacionalizacion(formdata).subscribe({
        next: (data) => {
          console.log('response');
          
          console.log(data);
          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
          }
          
        },
        error: (err) => {
          this.isLoadingUploadExcel = false;
          this.msg.error(`Ha ocurrido un error al subir el archivo Nacionalización, ${err.error.message}`);
        }
     });


    }

  }


  tipoExcel(item: any, index: any){

    this.indexTipoExcel = this.listTotalExcel[index]

    if(item.exe_codigo == 1){ //Pedido
      this.tipoExcelItem = 1
      this.fileList = []
      this.listExcel = []
    }

    if(item.exe_codigo == 2){ //facturacion
      this.tipoExcelItem = 2
      this.fileList = []
      this.listExcel = []
    }

    if(item.exe_codigo == 3){ // nacionalizción
      this.tipoExcelItem = 3
      this.fileList = []
      this.listExcel = []
    }

  }

  cerrarModalError(){
    this.isModalExcelError = false
    this.reporErrorExcel()
  }

  reporErrorExcel() {

   
    const doc = new jsPDF();

    this.datos = [];
    var columns = [
      'Lista de Errores',
    ];
    for (var a = 0; a < this.listErrorExcel.length; a++) {
      this.datos.push([
        this.listErrorExcel[a]

      ]);
    }

    //@ts-ignore
    doc.autoTable(columns, this.datos, { margin: { top: 10 } });
    doc.save('ListadoErrores.pdf');

  }


  reenviarCurbe(item: any){

    this.serviceSpiner.show()


    this.reenviarVin$ = this.servicePedido.reenviarVinCurbe$(item.veh_vin)
    
    this.subReenvia = this.reenviarVin$.subscribe(p => {
      console.log(p);
      
      this.renviarVinCurbe = p.renviarVinCurbe

      this.cargandoReenviar = p.cargando

      if(this.cargandoReenviar == false){
        this.serviceSpiner.hide()
        this.msg.success('Datos Actualizados Curbe')
        this.getListVins()
        this.subReenvia.unsubscribe()
      }
     
      
    });


  }

  openModalPdf(item: any){
    this.isModalPedf = true

    this.visualizarPDF(item.veh_vin)

  }


  visualizarPDF(veh_vin: any){

    console.log(veh_vin);

    this.filePdf = '../../../assets/files/ejemplo.pdf'
    //saveAs(this.filePdf, 'Recepción Vin');

    console.log('pedfff');
    console.log(this.filePdf);
    
    

    /*this.servicePedido.downloadPDFRecepcion(veh_vin).subscribe({
      next: (data) => {
       console.log(data);


      
       //saveAs(data, 'Recepción Vin');
       this.isModalPedf = false
      },
      error: (err) => {
        this.msg.error(
          `Ha ocurrido un error al Descargar PDF Recepción Vin, ${err}`
        );
      }
    });*/


  }

  downloadPDFRecepcion(){
    saveAs(this.filePdf, 'Recepción Vin');
    this.isModalPedf = false
  }



}
