import { ChangeDetectorRef, Component, OnInit, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/appModules/pedido/services/pedido.service';
import { GlobalserviceService } from 'src/app/core/globalservice.service';
import { SpinerService } from 'src/app/core/spiner.service';
import { RemisionService } from '../../services/remision.service'

import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

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
  selector: 'app-vines',
  templateUrl: './vines.component.html',
  styleUrls: ['./vines.component.scss']
})
export class VinesComponent implements OnInit{

  @ViewChild('temp', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;

  listOfColumnsLogistica: ColumnItem[] = [
    {
      width:'50px',
      name: 'VIN',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width: '80px',
      name: 'Buque',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width: '50px',
      name: 'Color',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'50px',
      name: 'ETA',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Estado',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },

    {
      width:'50px',
      name: 'Fecha',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      width: '50px',
      name: 'Marca',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width:'80px',
      name: 'Movilización',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Novedad',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Parte',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Proceso',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Referencia',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Tipo',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'50px',
      name: 'Número Novedades',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
  ];


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
    /*{
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
    },*/

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


  listColumLogistica: ColumnItem[] = [

    {
      width: '80px',
      name: 'Vin',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      
    },


    {
      width: '80px',
      name: 'Estado',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Movilización',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },


    {
      width: '80px',
      name: 'Nivel',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Novedad',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Parte Vin',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Proceso',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },


  ];




  listAux: any[] = []
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

  buscaGeneral: any

  listTotalExcel: any[] = [{label: 'Pedido',value: 'Pedido', useTemplate: true }, {label: 'Facturación',value: 'Pedido', useTemplate: true },
                           {label: 'Nacionalización',value: 'Pedido', useTemplate: true }, {label: 'Logistica',value: 'Pedido', useTemplate: true }]


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

  listAverias: any[] = [];
  averias$!: Observable<any>;
  cargandoAverias: boolean = false
  subAveria: any


  listImagenesEstado: any
  isModalPedf: boolean = false
  filePdf: any
  totalEstados: any [] = []
  checkControl: boolean = false
  controlSi: boolean = true
  controlNo: boolean = false
  subFecha: any
  control: boolean = true
  controlFecha: boolean = false

  codigo_guia: any
  isModalEstados: boolean = false
  listaHijosEstados: any [] = []
  indexTiempo = 0
  indexExcel = 1

  vin: any
  cargandoPdf: boolean = false
  tamano: number = 5
  generarCodigo: number = 0
  tipoElementoCodigo: number = 2
  codigoEstadoModal: number = 0


  constructor(private msg: NzMessageService,
    private cdRef:ChangeDetectorRef,
    private router: Router,
    private servicePedido: PedidoService,
    private serviceRemision: RemisionService,
    private fb: FormBuilder,
    private serviceGlobal: GlobalserviceService,
    private serviceSpiner: SpinerService,
    private rutaActiva: ActivatedRoute,) {

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
      var date = new Date();
      var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
      this.serviceGlobal.setFechaDesde(primerDia);
      this.serviceGlobal.setfechaHasta(this.hasta);

      /*this.servicePedido.updateListaVins.subscribe( value => {

        if(value == true){
          console.log('Activa Vins');

          this.servicePedido.updateListAllVinMarca(this.codigo_guia)
        }

      })*/

      this.codigo_guia = this.rutaActiva.snapshot.paramMap.get('guia')
      //console.log('parametros');
      //console.log(this.codigo_guia);
      this.serviceGlobal.setCodigoGuia(this.codigo_guia)
      //this.servicePedido.updateListAllVinMarca(this.codigo_guia)

  }



  ngOnInit(): void {
    this.listImagenesEstado = this.serviceGlobal.getListImagesEstado()
    
    //this.getListVins()
    this.getListVinsFecha(0)
    this.getListEstadosVin()
    this.desde = this.serviceGlobal.getFechaDesde();
    this.hasta = this.serviceGlobal.getFechaHasta();
    
    //this.getListAveriasVin('9BHCP41CAPP362972')


    this.indexTipoExcel = this.listTotalExcel[0]
  }




  chechselect(estado: any, vinSlect: any){

    let posicion = 0

    this.listVin.forEach((vin: any, index: any)=>{
      if(vin.veh_vin.toUpperCase() == vinSlect.toUpperCase()){
        posicion = index
      }
    })

    setTimeout(() => {

      this.listVin[posicion].listaEstadosPadres.forEach((item: any)=>{
        if(item.est_codigo == estado.est_codigo){
          item.check = true
        }
      })

    }, 1)


  }

  mensajeErrorPdf(){
    this.msg.warning('PARA GENERAR EL PDF TIENE QUE REALIZAR LA REVISIÓN DEL VIN')
  }

  openModalEstados(estadosHijos: any, vin: any, codigoEstado: number){


    if(codigoEstado === 28){
      console.log('enenenenenens');
      
      this.getListAveriasVin(vin)
    }
    //console.log(estadosHijos);
    this.isModalEstados = true
    this.listaHijosEstados = estadosHijos.listaHijos
    this.codigoEstadoModal = codigoEstado
    this.vin = vin

    this.listaHijosEstados.forEach((estado: any, index: any)=>{
      estado.veh_est_fecha_inicio = this.transformDate(estado.veh_est_fecha)
    })


  }

  onIndexChange(event: number): void {
    this.indexTiempo = event;
  }


  inicio(){
    this.router.navigate(['/remision/vines'])
    this.estadoExcel = false
  }

  realoadPedido(){
    //this.desde = new Date()
    //this.hasta = new Date()
    //this.servicePedido.updateListAllVinMarca(this.codigo_guia)
    this.listVin = []
    this.listVinAux = []
    this.tamano = 5
    this.generarCodigo = 0
    this.getListVinsFecha(0)
  }

  actualizarFecha(e: any) {
    if (!e) {
      this.tipoElementoCodigo = 2
      this.listVin = []
      this.serviceGlobal.setFechaDesde(this.desde);
      this.serviceGlobal.setfechaHasta(this.hasta);
      this.listVin = []
      this.listVinAux = []
      this.tamano = 5
      this.generarCodigo = 0
      this.getListVinsFecha(0)

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

    //console.log('mmmmmmmmmmmmmmmmm');


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
      ////console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      //var arraydatos =  XLSX.utils.sheet_to_json(worksheet,{raw:true});

      this.listExcel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
      //console.log(this.listExcel)


    }
  }

  openModalVin(){
    this.modalCreate = true

  }


  getListBusquedaVins(codigo: number){

    this.vin$ = this.servicePedido.getListVinBusqueda$(this.buscaGeneral.toUpperCase(), codigo);
    this.controlFecha = true

    this.sub = this.vin$.subscribe(p => {
      console.log('busqueadaaaaaaaaaaaaaa');
      
      console.log(p);

      this.listAux = p.listVin
      this.cargarPedido = p.cargando
     
      if(this.cargarPedido == false){
      
        if(this.controlFecha){

          this.listAux.forEach((item, index)=>{

            item.cargandoPDF = false
            item.index = index
            if(item.veh_estado_subir_curbe == 1){
              item.estado_curbe = true
            }else{
              item.estado_curbe = false
            }
            item.veh_fecha_crea_pedido = this.transformDate(item.veh_fecha_crea_pedido)
            item.veh_fecha_llegada = this.transformDate(item.veh_fecha_llegada)
            item.estadoActual.veh_est_fecha = this.transformDate(item.estadoActual.veh_est_fecha)
            //console.log(item.estadoActual.veh_est_fecha);


            item.listaEstadosPadres.forEach((est: any)=>{
              let total = 0
              if(est.listaHijos.length>0){
                
               
                est.listaHijos.forEach((hijos: any)=>{

                  total = total + hijos.cantidad_aberias

                })

              }

              est.averias = total 

            }) 
          })

          for(var j=0; j<this.listAux.length; j++){
            this.listVin = [...this.listVin, this.listAux[j]]
          }
          this.listVinAux = this.listVin


          this.controlFecha = false

        }
       

      }
     
    });  


  }


  buscaGeneralVin(codigo:  number){
    if (this.buscaGeneral == '' || this.buscaGeneral == null) {
      this.listVin = []
    }else{

      this.tipoElementoCodigo = 1
      this.listVin = []
      this.tamano = 5
      this.generarCodigo = 0
      this.getListBusquedaVins(codigo)
  
    }

  }


  filtroBuscarPedido(){

    //console.log('llll');
    //console.log(this.buscarPedido);

    
    if (this.buscarPedido == '' || this.buscarPedido == null) {

      //console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
      this.listVin = this.listVinAux

    }else{


      this.listVin = this.listVinAux.filter((item: any) => item.veh_vin.toUpperCase().indexOf(this.buscarPedido.toUpperCase()) !== -1 || item.veh_motor.toUpperCase().indexOf(this.buscarPedido.toUpperCase()) !== -1 || item.veh_modelo.toUpperCase().indexOf(this.buscarPedido.toUpperCase()) !== -1);
     
      
      
    }

  }

  visualizaSubirExcel(tipo: number){
    if(tipo == 1){
      this.estadoExcel = true
      this.indexExcel = 1
      this.tipoExcelItem = 1
    }
    if(tipo == 2){
      this.estadoExcel = false
      this.indexExcel = 1
      this.tipoExcelItem = 1
    }
  }


  getListAveriasVin(vin: any){

    this.averias$ = this.serviceRemision.getListAllAverias$(vin)

    this.subAveria = this.averias$.subscribe(p => {

      //console.log(p);

      this.listAverias = p.listAverias
    
      this.cargandoAverias = p.cargando

      if(this.cargandoAverias == false){
        this.subAveria.unsubscribe()
      }

    });

  }



  getListEstadosVin(){

    this.estadovin$ = this.servicePedido.getListAllEstadosVin$()

    this.subEstado = this.estadovin$.subscribe(p => {
      //console.log('lista estos vin---->>>>>>>>>>');
      
      //console.log(p);

      this.listEstadoVin = p.listEstadoVin

      this.cargandoEstado = p.cargando

      if(this.cargandoEstado == false){


        let filtros = this.listEstadoVin.map(c => {
          return {text: c.est_nombre, value: c.est_codigo}
        });



        //@ts-ignore
        this.listOfColumnsLista.find(x => x.name == 'Estado Actual').listOfFilter = filtros;





        //OPCION 2222222 ///////////////////////////////////////


        this.listOfColumnsLista.forEach((listavin: any, index: any)=>{


          let columna = {
            width:'200px',
            name: '',
            sortOrder: null,
            sortFn: null,
            sortDirections: [],
            filterMultiple: true,
            listOfFilter:[],
            filterFn: null,
            color: '',
            color2: '',
            colnum: index + 1

          }



          if(this.listOfColumnsLista.length == columna.colnum){
            this.listOfColumnsEstados = [... this.listOfColumnsEstados, columna]

          }




        })




        this.listEstadoVin.forEach((item: any, index: any)=>{

          let columna = {
            width:'200px',
            name: item?.est_nombre,
            sortOrder: null,
            sortFn: null,
            sortDirections: [],
            filterMultiple: true,
            listOfFilter:[],
            filterFn: null,
            color: '',
            color2: '',
            colnum: '1'
          }

          if(item.est_codigo == 1 || item.est_codigo == 2 || item.est_codigo == 3 || item.est_codigo == 4 || item.est_codigo == 5 || item.est_codigo == 6 || item.est_codigo == 8 || item.est_codigo == 28  ){


            this.totalEstados.push({est_codigo: item.est_codigo, cod_estado: item.est_codigo, estado_activado: false})
            this.listOfColumnsEstados = [... this.listOfColumnsEstados, columna]


          }

        })


        //console.log('total estados');
        //console.log(this.totalEstados);



        this.listEstadoVin.forEach((item: any, index: any)=>{



          let columna = {
            width:'10px',
            name: 'z',
            sortOrder: null,
            sortFn: null,
            sortDirections: [],
            filterMultiple: true,
            listOfFilter:[],
            filterFn: null,
            color: 'black',
            color2: '#1890ff',
            colnum: ''
          }



          if(item.est_codigo == 1 || item.est_codigo == 2 || item.est_codigo == 3 || item.est_codigo == 4 || item.est_codigo == 5 || item.est_codigo == 6 || item.est_codigo == 8 || item.est_codigo == 28 ){


            this.listOfColumnsLista = [... this.listOfColumnsLista, columna]

          }
        })


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


  /*getListVins(){


    this.vin$ = this.servicePedido.getListAllVins$(this.codigo_guia);


    this.sub = this.vin$.subscribe(p => {

      //console.log('VINES TOTALES: ');
      console.log(p);
      this.listVin = p.listVin
      this.listVinAux = p.listVin
      //this.control = p.control
      this.cargarPedido = p.cargando

      if(this.cargarPedido == false){
        if(this.control){

          this.listVin.forEach((item, index)=>{
           
            
            item.cargandoPDF = false
            item.index = index
            if(item.veh_estado_subir_curbe == 1){
              item.estado_curbe = true
            }else{
              item.estado_curbe = false
            }
            item.veh_fecha_crea_pedido = this.transformDate(item.veh_fecha_crea_pedido)
            item.veh_fecha_llegada = this.transformDate(item.veh_fecha_llegada)
            item.estadoActual.veh_est_fecha = this.transformDate(item.estadoActual.veh_est_fecha)
            //console.log(item.estadoActual.veh_est_fecha);


            item.listaEstadosPadres.forEach((est: any)=>{
              let total = 0
              if(est.listaHijos.length>0){
                
               
                est.listaHijos.forEach((hijos: any)=>{

                  total = total + hijos.conteo

                })

              }

              est.averias = total

            }) 
          })

          this.control = false

        }

      }

      //console.log('lista vin');
      //console.log(this.listVin);

    });

  }*/


  cargarMasDatos(dato: any){
  

    //console.log('tttttttttttt');
    
    //console.log(dato+ " "+this.tamano);

    if(dato == this.tamano){
      this.tamano = this.tamano + 5
      this.generarCodigo = this.generarCodigo + 1

      if(this.tipoElementoCodigo == 2){
        this.getListVinsFecha(this.generarCodigo)

      }
      if(this.tipoElementoCodigo == 1){
        this.getListBusquedaVins(this.generarCodigo)
      }

    }
    
    
  }


  getListVinsFecha(codigo: number){

    this.vin$ = this.servicePedido.getAllVinsFechas$(codigo)
    this.controlFecha = true


    this.sub = this.vin$.subscribe(p => {

      console.log(p);
      
      this.listAux = p.listVin
      //this.listVinAux = p.listVin
      //this.control = p.control
      this.cargarPedido = p.cargando

      //console.log('despues');
      //console.log(this.cargarPedido);
     
      if(this.cargarPedido == false){
        
        if(this.controlFecha){

          this.listAux.forEach((item, index)=>{

            item.cargandoPDF = false
            item.index = index
            if(item.veh_estado_subir_curbe == 1){
              item.estado_curbe = true
            }else{
              item.estado_curbe = false
            }
            item.veh_fecha_crea_pedido = this.transformDate(item.veh_fecha_crea_pedido)
            item.veh_fecha_llegada = this.transformDate(item.veh_fecha_llegada)
            item.estadoActual.veh_est_fecha = this.transformDate(item.estadoActual.veh_est_fecha)
            //console.log(item.estadoActual.veh_est_fecha);


            item.listaEstadosPadres.forEach((est: any)=>{
              let total = 0
              if(est.listaHijos.length>0){
                
               
                est.listaHijos.forEach((hijos: any)=>{

                  //total = total + hijos.conteo
                  total = total + hijos.cantidad_aberias
                })

              }

              est.averias = total 

            }) 
          })

          for(var j=0; j<this.listAux.length; j++){
            this.listVin = [...this.listVin, this.listAux[j]]
          }
          this.listVinAux = this.listVin


          this.controlFecha = false

        }
        //console.log('lista vin');
        //console.log(this.listVin);

      }

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
    //console.log('llega');

    if(this.tipoExcelItem == 1){

      this.servicePedido.uploadFileExelPedido(formdata).subscribe({
        next: (data) =>  {
          //console.log('response');
          //console.log(data);

          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)

          }else{
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.msg.success('Datos Subidos Correctamente!!!')
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)
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
          //console.log('response');

          //console.log(data);
          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)

          }else{
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.msg.success('Datos Subidos Correctamente!!!')
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)
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
          //console.log('response');

          //console.log(data);
          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)

          }else{
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.msg.success('Datos Subidos Correctamente!!!')
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)
          }

        },
        error: (err) => {
          this.isLoadingUploadExcel = false;
          this.msg.error(`Ha ocurrido un error al subir el archivo Nacionalización, ${err.error.message}`);
        }
     });
    }

    if(this.tipoExcelItem == 4){

      this.servicePedido.uploadFileExelLogistica(formdata).subscribe({
        next: (data) => {
          //console.log('response');

          //console.log(data);
          if(data.length>0){
            this.listErrorExcel = data
            this.isModalExcelError = true
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)

          }else{
            this.isLoadingUploadExcel = false
            this.listExcel = []
            this.fileList = []
            this.msg.success('Datos Subidos Correctamente!!!')
            this.servicePedido.updateListAllVinMarca(this.codigo_guia)
          }

        },
        error: (err) => {
          this.isLoadingUploadExcel = false;
          this.msg.error(`Ha ocurrido un error al subir el archivo Logisticas, ${err.error.message}`);
        }
     });
    }

  }


  tipoExcel(index: any){




    this.indexExcel = index + 1



    //this.indexTipoExcel = this.listTotalExcel[index]

    if(this.indexExcel == 1){ //Pedido
      this.tipoExcelItem = 1
      this.fileList = []
      this.listExcel = []
    }

    if(this.indexExcel == 2){ //facturacion
      this.tipoExcelItem = 2
      this.fileList = []
      this.listExcel = []
    }

    if(this.indexExcel == 3){ // nacionalizción
      this.tipoExcelItem = 3
      this.fileList = []
      this.listExcel = []
    }

    if(this.indexExcel == 4){ // logistica
      this.tipoExcelItem = 4
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
      //console.log(p);

      this.renviarVinCurbe = p.renviarVinCurbe

      this.cargandoReenviar = p.cargando

      if(this.cargandoReenviar == false){
        this.serviceSpiner.hide()
        this.msg.success('Datos Actualizados Curbe')
        //this.getListVins()
        this.subReenvia.unsubscribe()
      }


    });


  }

  openModalPdf(item: any){
    this.isModalPedf = true

    this.visualizarPDF(item.veh_vin)

  }


  visualizarPDF(veh_vin: any){

    //console.log(veh_vin);

    this.filePdf = '../../../assets/files/ejemplo.pdf'
    //saveAs(this.filePdf, 'Recepción Vin');

    //console.log('pedfff');
    //console.log(this.filePdf);



    /*this.servicePedido.downloadPDFRecepcion(veh_vin).subscribe({
      next: (data) => {
       //console.log(data);



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

  descargarPDF(vin: any, index: any) {

   
    if(this.listVin.length == 1){
      index = 0
    }
    
    this.listVin[index].cargandoPDF = true
    
    this.servicePedido.downloadPDFRecepcion(vin).subscribe({
      next: (data) =>{
        console.log(data);
        this.listVin[index].cargandoPDF = false
        saveAs(data, 'Reporte Recepción');
        
      },
      error: (err) =>{
        this.listVin[index].cargandoPDF = false
        this.msg.error('PROBLEMAS AL DESCARGAR PDF '+err.message)
      }

    });
  }

}
