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
import { SpinerService } from '../../../../core/spiner.service'
import { GlobalserviceService } from '../../../../core/globalservice.service'


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

  listDetalleEstadoVin: any[] = [];
  objetoDetalle: any
  detallevin$!: Observable<any>;
  subDetalleVin: any
  cargandoDetalleVin: boolean = false


  objEstadoEtapaObservacion = {estadoEtapa:{est_codigo: 0, est_nombre: 'OBSERVACIONES DE CONSECIONARIO', est_marca: 100}, detalleEstado:{}, veh_est_fecha: null, veh_dias:0}
  objInformacionVin = {estadoEtapa:{est_codigo: 100, est_nombre: 'INFORMACIÓN DE VIN', est_marca: 100}, detalleEstado:{}, veh_est_fecha: null, veh_dias: 0}
  objTraslado = {estadoEtapa:{est_codigo: 200, est_nombre: 'TRASLADO', est_marca: 100}, detalleEstado:{}, veh_est_fecha: null, veh_dias: 0}


  objPrueba = {estadoEtapa:{est_codigo: 111, est_nombre: 'RECEPCIÓN', est_marca: 100}, detalleEstado:{}, veh_est_fecha: null, veh_dias: 0}


  indexTiempo = 0
  total_dias_proceso = 0


  listImagenesEstado: any

  constructor(@Inject('BASE_URL') baseUrl: string,
    private servicePedido: PedidoService,
    private router: Router,
    private msg: NzMessageService,
    private rutaActiva: ActivatedRoute,
    private serviceObservacion: ObservacionService,
    private serviceSpiner: SpinerService,
    private serviceGlobal: GlobalserviceService) {

      this.baseUrl = baseUrl.substring(0, baseUrl.length - 1);

  }

  ngOnInit(): void {
    this.veh_codigo = this.rutaActiva.snapshot.paramMap.get('vin')
    //this.getVinDetalle(this.veh_codigo)
    
    this.getListObservacionVin()
    this.getDetalleEstadoVin(this.veh_codigo)
    this.getListDocumentsVin()
    this.ancho = this.porcentaje(40)
    this.alto = this.ancho / 1.4036
   
    this.listImagenesEstado = this.serviceGlobal.getListImagesEstado()
    
    
  }

  ngAfterViewInit(): void {
    console.log('iniciaaaa');
    //this.initLienzo()
  }

  transformDate(newDate: any): any{
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    var hora = moment(newDate,'HH:mm:ss').format("HH");
    var minuto = moment(newDate,'HH:mm:ss').format("mm");

    let fecha = dia + " de "+ mes +" del "+anio +' '+hora+':'+minuto

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

    console.log('llega observaciones');

    console.log(this.listObservacionVin);
    
    if(this.listObservacionVin.length>0){

  
      this.listObservacionVin.forEach((obs)=>{

        if(obs.obs_pos_x > 0 && obs.obs_pos_y >0){

          let aux = (obs.obs_pos_x * this.ancho) / 100
          let auy = (obs.obs_pos_y * this.alto) / 100
          
          this.context.beginPath();
          this.context.fillStyle = 'red';
          this.context.strokeStyle = 'black';
          this.context.arc(aux, auy, 10, 0, 2 * Math.PI);
          this.context.fill();
          this.context.stroke();
  
        }
  
      })
  
  
    }
    
   
  }


  getDetalleEstadoVin(veh_codigo: any){

    var listaTransito: any []

    this.detallevin$ = this.servicePedido.getListAllDetalleEstadosVin$(veh_codigo);
    this.subDetalleVin = this.detallevin$.subscribe((p) => {
      console.log('detallessss nuevo');
      console.log(p);
      
      
      this.objetoDetalle = p.listDetalleEstadoVin;
      this.cargandoDetalleVin = p.cargando;

      if(this.cargandoDetalleVin == false){


        this.listDetalleEstadoVin = this.objetoDetalle.vehiculoDetalle.listaEstado

        //METODO PARA AGRUPAR LOS TRASLADOS

        this.listDetalleEstadoVin.forEach((item: any, index: any)=>{
          if(item.estadoEtapa.est_id_padre == 6){
            console.log('siiiiii');
            
            listaTransito = this.listDetalleEstadoVin.slice(index-1, index)
          }
        })

        

        ///////////////////////////////////////////
        
        this.listDetalleEstadoVin.push(this.objEstadoEtapaObservacion)
        this.listDetalleEstadoVin.unshift(this.objInformacionVin)


        for(var j=0; j<this.listDetalleEstadoVin.length; j++){

          if(this.listDetalleEstadoVin[j].veh_est_fecha){


            
            this.listDetalleEstadoVin[j].veh_est_fecha_inicio = this.transformDate(this.listDetalleEstadoVin[j].veh_est_fecha)
            
            if(j == this.listDetalleEstadoVin.length-2){

              this.listDetalleEstadoVin[j].veh_est_fecha_salida = this.transformDate(new Date())
              
              var fecha1 = moment(this.listDetalleEstadoVin[j].veh_est_fecha)
              var fecha2 = moment(new Date())

              this.listDetalleEstadoVin[j].veh_dias = fecha2.diff(fecha1, 'days')

            }else{

              this.listDetalleEstadoVin[j].veh_est_fecha_salida = this.transformDate(this.listDetalleEstadoVin[j+1].veh_est_fecha)
              
              var fecha1 = moment(this.listDetalleEstadoVin[j].veh_est_fecha)
              var fecha2 = moment(this.listDetalleEstadoVin[j+1].veh_est_fecha)

              this.listDetalleEstadoVin[j].veh_dias = fecha2.diff(fecha1, 'days')

            
            }

          }

        }


       
        this.listDetalleEstadoVin.forEach((item)=>{
          this.total_dias_proceso = this.total_dias_proceso + item.veh_dias
          
        })

        console.log('este otrooooooooooooooooooo');
        
        console.log(this.listDetalleEstadoVin);
        console.log(this.total_dias_proceso);
        

        this.subDetalleVin.unsubscribe()
      }

    });

  }


  

  
  getVinDetalle(veh_vin: any){

    this.cargandoDatosVin = true
    this.servicePedido.getDetalleVin(veh_vin).subscribe({
      next: (data) => {
        console.log('detallee');
        
        /*if(data){
          this.detalleVin = data.vehiculoDetalle
          this.detalleVinDatos = data
          this.detalleVin.listaEstado.forEach((item: any, index: any)=>{
            item.veh_est_fecha = this.transformDate(item.veh_est_fecha)
            item.active = true
          });
          this.cargandoDatosVin = false
        }else{
          this.msg.error('No tiene detalle Vin')
        }*/


      },
      error: (err) => {
        this.msg.error(`Ha ocurrido un error al obtener detalle Vin, ${err.error.message}`);
      }
    })
  

  }


  getListObservacionVin(){
    this.observacionvin$ = this.serviceObservacion.getListAllObservacionVin$(this.veh_codigo)
    
    this.sub = this.observacionvin$.subscribe(p => {
      console.log('lista detalle obs');
      
      console.log(p);
  
      this.listObservacionVin = p.listObservacionVin.observaciones
      
      this.listAccesorioVin = p.listObservacionVin.accesorios
      this.cargandoObservacion = p.cargando

      if(this.cargandoObservacion == false){
        
        
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


  clickAcordion(item: any){
    console.log(item);


    if(this.listObservacionVin.length>0){
      this.initLienzo()
      if(item == 0){
        setTimeout(() => {
  
          this.paintPointObservacion()
        }, 50);
      }
  
    }

    
  }


  onIndexChange(event: number): void {
    this.indexTiempo = event;
  }


}
