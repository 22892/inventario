import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ObservacionService } from '../../../observacion/services/observacion.service'
import { Observable } from 'rxjs';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder,} from 'ng-zorro-antd/table';
import 'moment/locale/es';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';


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


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, AfterViewInit {

  @ViewChild('sigPad', { static: false }) sigPad: any;
  sigPadElement: any;
  context: any;
  respaldoContext: any
  isDrawing = false;
  img: any;
  picture: string = "../../../assets/carro.jpeg"
  data: any


  listOfColumnsObservacion: ColumnItem[] = [

    {
      width: '100px',
      name: 'Vin',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    
  
    {
      width: '140px',
      name: 'Sección',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '110px',
      name: 'Daño',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },


    {
      width: '110px',
      name: 'Tamaño',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '120px',
      name: 'Opciones',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
   
  ];


  tabs = [
    {
      name: 'Información Vin',
      icon: 'form',
    },   
   
  ];

  tabsObs = [
    {
      name: 'Observaciones de Vin',
      icon: 'form',
    },   
    {
      name: 'Accesorios',
      icon: 'check',
    }, 
    {
      name: 'Documentos',
      icon: 'file-search',
    },  
   
  ];


  cargandoDatosVin: boolean = false
  index: number = 0
  indexObs: number = 0
  veh_codigo: any
  detalleVin: any

  listObservacionVin: any[] = [];
  listObservacionVinFoto: any[] = [];

  listAccesorioVin: any[] = [];

  observacionvin$!: Observable<any>;
  sub: any
  cargandoObservacion: boolean = false

  windowWidth = window.innerWidth;
  windowHeight =  document.documentElement.scrollHeight;


  ancho: any = 0
  alto: any = 0

  aspecto: any = 1.4036

  detalleVinDatos: any

  isLoadingFoto: boolean = false
  isVisibleModalFoto: boolean = false

  baseUrl: string = '';

  listDocumentoGeneral: any[] = [];
  documentogeneral$!: Observable<any>;
  loadingDocumento: boolean = false
  subDocumento: any
  cargandoDocumento: boolean = false
  size: NzButtonSize = 'large';




  constructor(@Inject('BASE_URL') baseUrl: string,
    private servicePedido: PedidoService,
    private router: Router,
    private msg: NzMessageService,
    private rutaActiva: ActivatedRoute,
    private serviceObservacion: ObservacionService) {

      this.baseUrl = baseUrl.substring(0, baseUrl.length - 1);

  }

  ngOnInit(): void {
    this.veh_codigo = this.rutaActiva.snapshot.paramMap.get('vin')
    console.log('vinnnnn');
    console.log(this.veh_codigo);
    this.getVinDetalle(this.veh_codigo)
    this.getListObservacionVin()
    this.getListDocumentsVin()
    this.ancho = this.porcentaje(40)
    this.alto = this.ancho / 1.4036
   
    console.log(this.ancho);
    console.log(this.alto);
    
    
  }

  ngAfterViewInit(): void {
    console.log('iniciaaaa');
    this.initLienzo()
  }

  transformDate(newDate: any): any{
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    let fecha = dia + " de "+ mes +" del "+anio

    return fecha
  }

  pestanaItem(index: any) {

    if(index == 0){

      setTimeout(() => {
        this.initLienzo()
        
      }, 40);

      setTimeout(() => {

        this.paintPointObservacion()
      }, 500);

    }
  
  }



  porcentaje(porcen: any){
    return (this.windowWidth * porcen) / 100
  }

  initLienzo(){

    console.log('nitial');
    
    this.sigPadElement = this.sigPad.nativeElement
    this.context = this.sigPadElement.getContext('2d');
    var img = new Image();
    img.src = "../../../assets/images/imagencarro.png";
    let self = this;
    var dimensiones ={
      x: this.ancho,
      y: this.alto
    }
    img.onload = function(){
      self.context.drawImage(img, 0,0, dimensiones.x, dimensiones.y);
    }
   
    
  }


  paintPointObservacion(){

    console.log('llega');

    console.log(this.listObservacionVin);
    
    
    this.listObservacionVin.forEach((obs)=>{

      let aux = (obs.obs_pos_x * this.ancho) / 100
      let auy = (obs.obs_pos_y * this.alto) / 100
      
      this.context.beginPath();
      this.context.fillStyle = 'red';
      this.context.strokeStyle = 'black';
      this.context.arc(aux, auy, 10, 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();

    })

   
  }


  
  getVinDetalle(veh_vin: any){

    this.cargandoDatosVin = true
    this.servicePedido.getDetalleVin(veh_vin).subscribe({
      next: (data) => {
        console.log(data);
        
        if(data){
          this.detalleVin = data.vehiculoDetalle
          this.detalleVinDatos = data
          //console.log('ddddd');
          //console.log(this.detalleVin);
          
          this.detalleVin.listaEstado.forEach((item: any, index: any)=>{
            item.veh_est_fecha = this.transformDate(item.veh_est_fecha)
            item.active = true
          });
          this.cargandoDatosVin = false
        }else{
          this.msg.error('No tiene detalle Vin')
        }
      },
      error: (err) => {
        this.msg.error(`Ha ocurrido un error al obtener detalle Vin, ${err.error.message}`);
      }
    })
  

  }


  getListObservacionVin(){
    this.observacionvin$ = this.serviceObservacion.getListAllObservacionVin$(this.veh_codigo)
    
    this.sub = this.observacionvin$.subscribe(p => {
      console.log(p);
  
      this.listObservacionVin = p.listObservacionVin.observaciones
      
      this.listAccesorioVin = p.listObservacionVin.accesorios
      this.cargandoObservacion = p.cargando

      if(this.cargandoObservacion == false){
        setTimeout(() => {

          this.paintPointObservacion()
        }, 50);
        this.sub.unsubscribe()
      }
    });

  }


  openModalFoto(item: any){

    this.listObservacionVinFoto = []
    this.isVisibleModalFoto = true
    item.listaDocumentos.forEach((item: any)=>{
      this.listObservacionVinFoto = [... this.listObservacionVinFoto, item]

    })

  }


  cerrarModalFoto(){
    this.isVisibleModalFoto = false
  }

  getListDocumentsVin() {
    
    this.documentogeneral$ = this.serviceObservacion.getListAllDocuemtoVin$(this.veh_codigo);
    this.subDocumento = this.documentogeneral$.subscribe((p) => {
      console.log('docuemtos ngeneral');
      console.log(p);
      
      this.listDocumentoGeneral = p.listDocumentoGeneral;
      this.cargandoDocumento = p.cargando;

      if(this.cargandoDocumento == false){

        this.subDocumento.unsubscribe()
      }

    });
  }



}
