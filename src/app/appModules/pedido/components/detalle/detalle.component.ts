import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ObservacionService } from '../../../observacion/services/observacion.service'
import { Observable } from 'rxjs';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder,} from 'ng-zorro-antd/table';


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

  cargandoDatosVin: boolean = false
  index: number = 0
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
  codObservacion: any
  listFotoEdit: any[] = [];


  constructor(private servicePedido: PedidoService,
    private router: Router,
    private msg: NzMessageService,
    private rutaActiva: ActivatedRoute,
    private serviceObservacion: ObservacionService) {

  }

  ngOnInit(): void {
    this.veh_codigo = this.rutaActiva.snapshot.paramMap.get('vin')
    console.log('vinnnnn');
    console.log(this.veh_codigo);
    this.getVinDetalle(this.veh_codigo)
    this.getListObservacionVin()

    this.ancho = this.porcentaje(40)
    this.alto = this.ancho / 1.4036
   
    console.log(this.ancho);
    console.log(this.alto);
    
    
  }

  ngAfterViewInit(): void {
    console.log('iniciaaaa');
    this.initLienzo()
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
    this.servicePedido.getDetalleVin(veh_vin).subscribe(
      data => {
          
        console.log('respuesta--ffff-');
        console.log(data);
        
        if(data){
          this.detalleVin = data.vehiculoDetalle
          this.detalleVinDatos = data
          console.log('ddddd');
          
          console.log(this.detalleVin);
          
          this.detalleVin.listaEstado.forEach((item: any, index: any)=>{
            item.active = true
          });
          this.cargandoDatosVin = false
        }else{
          this.msg.error('No tiene detalle Vin')
        }
    },
    err => {
      this.msg.error(`Ha ocurrido un error al obtener detalle Vin, ${err.error.message}`);
    })
  

  }


  getListObservacionVin(){
    this.observacionvin$ = this.serviceObservacion.getListAllObservacionVin$(this.veh_codigo)
    
    this.sub = this.observacionvin$.subscribe(p => {
      console.log(p);

      console.log('kkkk');
      console.log();
      
      
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

    this.isVisibleModalFoto = true
    console.log(item.cod_observacion);
    this.codObservacion = item.cod_observacion
    this.listFotoEdit = []

    console.log('objeto obs vin');
    console.log();
    

    for(var i=0; i<item.length; i++){

      //if(this.listObservacionVinFoto[i].cod_observacion == item.cod_observacion){
        this.listObservacionVinFoto[i] = item

      //}
    }
    


  }

  openModalDocumento(item: any){

  }

  openModalAccedorios(item: any){

  }



  cerrarModalFoto(){

  }

}
