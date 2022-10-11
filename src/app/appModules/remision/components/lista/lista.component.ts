import { Component, Inject, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { RemisionService } from '../../services/remision.service'
import { Observable} from 'rxjs';
import { GlobalserviceService } from '../../../../core/globalservice.service'
import { Router } from '@angular/router';
import * as moment from 'moment'
import 'moment/locale/es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {




  desde!: Date;
  hasta!: Date;
  mode = 'date';

  listGuiaRemisionAux: any[] = []


  listGuiaPendiente: any[] = []
  guiapendiente$!: Observable<any>;
  cargandoPendientes: boolean = false
  subPendiente: any

  listGuiaFinalizada: any[] = []
  guiafinalizada$!: Observable<any>;
  cargandoFinalizado: boolean = false
  subFinaliza: any


  buscarGuia: any
  p: number = 1;
  codigo_guia: any

  modalGuia: boolean = false
  itemGuia: any
  control: boolean = true
  baseUrl: string = '';



  tabs = [
    {
      name: 'PENDIENTES',
      icon: 'issues-close'
    },
    {
      name: 'FINALIZADOS',
      icon: 'check'
    }
  ];
  index: number = 0;
  modalRecepcion: boolean = false
  itemGuiaInfo: any

  firmaConductor: any
  ctx: any

  panels = [
   
    {
      active: false,
      name: 'RECEPCIÓN'
    }
  ];

  tipoLista: number = 0
  listGuiaPendienteAux: any[] = []
  listGuiaFinalizadaAux: any[] = []

  

  constructor(private serviceRemision: RemisionService,
    private serviceGlobal: GlobalserviceService,
    private router: Router,
    private msg: NzMessageService,
   

    @Inject('BASE_URL') baseUrl: string,) {

      this.baseUrl = baseUrl

      this.serviceRemision.updateListaRemision.subscribe( value => {

        if(value == true){

         
          //console.log('codigo cambiando');
          //console.log(this.serviceGlobal.getCodigoEmpresa());
          
          const fecha = new Date();
          const anioActual = fecha.getFullYear();
          const mesActual = fecha.getMonth() + 1; 

          this.getListRemisionFinalizadas(mesActual,anioActual)
          this.getListRemisionPendientes()
        }

      })

  }



  ngOnInit(): void {
    
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    const mesActual = fecha.getMonth() + 1; 
    this.getListRemisionFinalizadas(mesActual,anioActual)
    this.getListRemisionPendientes()

  }

  inicio(){

    this.router.navigate(['/remision/lista'])

  }

  filtroBuscarGuia(){
    if (this.buscarGuia == '' || this.buscarGuia == null) {
      if(this.tipoLista == 0){
        this.listGuiaPendiente = this.listGuiaPendienteAux
      }
      if(this.tipoLista == 1){
        this.listGuiaFinalizada = this.listGuiaFinalizadaAux
      }

    }else{

      if(this.tipoLista == 0){
        this.listGuiaPendiente = this.listGuiaPendienteAux.filter((item: any) => item.gur_nombre.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1  );

      }
      if(this.tipoLista == 1){
        this.listGuiaFinalizada = this.listGuiaFinalizadaAux.filter((item: any) => item.gur_nombre.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1  );

      }


    }


  }


  actualizarFecha(e: any) {
    if (!e) {


    }
  }

  reloadGuias(){
    
  }

  pestanaItem(index: any){
    //console.log('indexxx');
    //console.log(index);
    this.tipoLista = index
    this.buscarGuia = ""
    this.listGuiaPendiente = this.listGuiaPendienteAux
    this.listGuiaFinalizada = this.listGuiaFinalizadaAux
    
  }


  getListRemisionPendientes(){

    this.guiapendiente$ = this.serviceRemision.getListAllRemisionPendiente$()

    this.subPendiente = this.guiapendiente$.subscribe(p => {

      //console.log(p);

      this.listGuiaPendiente = p.listGuiaPendiente
      this.listGuiaPendienteAux = p.listGuiaPendiente
      this.cargandoPendientes = p.cargando

      if(this.cargandoPendientes == false){
        this.subPendiente.unsubscribe()
      }

    });

  }





  getListRemisionFinalizadas(mes: number, anio: number){

    this.guiafinalizada$ = this.serviceRemision.getListAllRemisionFinalizada$(mes, anio)

    this.subFinaliza = this.guiafinalizada$.subscribe(p => {

      //console.log(p);

      this.listGuiaFinalizada = p.listGuiaFinalizada
      this.listGuiaFinalizadaAux = p.listGuiaFinalizada
      
      this.cargandoFinalizado = p.cargando

      if(this.cargandoFinalizado == false){
        this.subFinaliza.unsubscribe()
      }

    });

  }




  irListaVins(codigo_guia: number){

    //console.log(codigo_guia);

  }

  onPageIndexChange($event: any) {
    //do something here to go to next page
    //console.log($event);

  }

  modalInfoGuia(guia: any){
    //console.log('modaaaaaaaaaaaaaaaaaaaa');
    console.log(guia);

    if(guia.recepcion != null){
      this.modalGuia = true

      this.itemGuia = guia.recepcion
      this.itemGuia.rec_fecha =  this.transformDate(this.itemGuia.rec_fecha)
      this.itemGuia.rec_hora = this.transformHora(this.itemGuia.rec_fecha)
  
    }else{
      this.msg.info('NO TIENE FINALIZADA LA RECEPCIÓN')
    }

  }

  cerrarModalGuia(){
    this.modalGuia = false
  }

  transformHora(newDate: any): any{
    var hora = moment(newDate,'HH:mm:ss').format("HH");
    var minuto = moment(newDate,'HH:mm:ss').format("mm");
    var segundo = moment(newDate,'HH:mm:ss').format("ss");

    let horas = hora + " : "+ minuto +" : "+segundo

    return horas

  }

  transformDate(newDate: any): any{
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    let fecha = dia + " de "+ mes +" del "+anio

    return fecha
  }

  openModalRecepcion(guia: any){
    this.modalRecepcion = true
    this.itemGuiaInfo = guia
  }

  guardarRecepcion(){

  }



}
