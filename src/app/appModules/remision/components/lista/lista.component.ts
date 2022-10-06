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


  listGuiaRemision: any[] = []
  listFinalizda: any [] = []
  listPendiente: any [] = []


  desde!: Date;
  hasta!: Date;
  mode = 'date';

  //listGuiaRemision: any[] = []
  listGuiaRemisionAux: any[] = []
  guia$!: Observable<any>;
  cargandoRemision: boolean = false
  sub: any
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

  

  constructor(private serviceRemision: RemisionService,
    private serviceGlobal: GlobalserviceService,
    private router: Router,
    private msg: NzMessageService,
    @Inject('BASE_URL') baseUrl: string,) {

      this.baseUrl = baseUrl

  }



  ngOnInit(): void {
    this.getListRemisionVins()


  }


  onMouseMove(e: any) {
    console.log('mousssssssssssss');
    
  }


  selectTipoLista(event: any){

  }

  inicio(){


    this.router.navigate(['/remision/lista'])

  }

  filtroBuscarGuia(){
    if (this.buscarGuia == '' || this.buscarGuia == null) {
      this.listGuiaRemision = this.listGuiaRemisionAux
    }else{

      this.listGuiaRemision = this.listGuiaRemisionAux.filter((item: any) => item.gur_nombre.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1  );

    }


  }


  actualizarFecha(e: any) {
    if (!e) {


    }
  }

  reloadGuias(){
    this.getListRemisionVins()
  }


  getListRemisionVins(){


    this.guia$ = this.serviceRemision.getListAllRemision$()

    this.sub = this.guia$.subscribe(p => {

      console.log(p);

      this.listGuiaRemision = p.listGuiaRemision
      this.listGuiaRemisionAux = p.listGuiaRemision
      this.cargandoRemision = p.cargando

      if(this.cargandoRemision == false){

        /*if(this.control){
          this.listGuiaRemision.forEach((item: any, index: any)=>{
            
            item.gur_fecha = this.transformDate(item.gur_fecha)

          })
        }
        this.control = false*/

        this.listGuiaRemision.forEach((item: any, index: any)=>{
            
          if(item.recepcion != null && item.pendientes === false){
            this.listFinalizda.push(item)
          }else{
            this.listPendiente.push(item)
          }

        })


        this.sub.unsubscribe()

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
