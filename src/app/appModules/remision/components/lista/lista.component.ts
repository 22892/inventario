import { Component, Inject, OnInit } from '@angular/core';
import { RemisionService } from '../../services/remision.service'
import { Observable} from 'rxjs';
import { GlobalserviceService } from '../../../../core/globalservice.service'
import { Router } from '@angular/router';
import * as moment from 'moment'
import 'moment/locale/es';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  /*listGuiaRemision: any[] = [{codigo: 1, name: 'Guia 1', conductor: 'Jimi Ortiz', placa: 'HAP-1234', estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 2, name: 'Guia 1', conductor: 'Pedro Ortiz', placa: 'PLP-1234' , estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 3, name: 'Guia 3', conductor: 'Karina Perez', placa: 'LAP-1234', estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 4, name: 'Guia 4', conductor: 'Juan Ortiz', placa: 'TYP-1234', estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 5, name: 'Guia 5', conductor: 'Alvaro Gonzales', placa: 'AOL-1234', estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 6, name: 'Guia 6', conductor: 'Mauricio Avila', placa: 'XCP-1234',estado:{codigo: 1, estado:'Pendiente'}},
                             {codigo: 7, name: 'Guia 7', conductor: 'Mario Ochoa', placa: 'AKK-1234',estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 8, name: 'Guia 8', conductor: 'Carlos Perez', placa: 'WWP-1234',estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 9, name: 'Guia 9', conductor: 'Kiara Pezantes', placa: 'MAP-1234',estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 10, name: 'Guia 10', conductor: 'Jhon Ortiz', placa: 'BYP-1234',estado:{codigo: 1, estado:'Pendiente'}},
                             {codigo: 11, name: 'Guia 11', conductor: 'Paola Alvarez', placa: 'NNP-1234',estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 12, name: 'Guia 12', conductor: 'Oswaldo Tapia', placa: 'AAP-1234',estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 13, name: 'Guia 13', conductor: 'Talia Merino', placa: 'LLP-1234',estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 14, name: 'Guia 14', conductor: 'Juan Coro', placa: 'UPP-1234',estado:{codigo: 1, estado:'Pendiente'}},
                             {codigo: 15, name: 'Guia 15', conductor: 'Karmita Lazo', placa: 'AAS-1234',estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 15, name: 'Guia 15', conductor: 'Pedro Ortiz', placa: 'UPP-1234',estado:{codigo: 1, estado:'Pendiente'}}]*/

  listGuiaRemision: any[] = []
                        

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


  constructor(private serviceRemision: RemisionService,
    private serviceGlobal: GlobalserviceService,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,) {

      this.baseUrl = baseUrl

  }

  ngOnInit(): void {
    this.getListRemisionVins()

  }

  inicio(){

    
    this.router.navigate(['/remision/lista'])

  }

  filtroBuscarGuia(){
    if (this.buscarGuia == '' || this.buscarGuia == null) {
      this.listGuiaRemision = this.listGuiaRemisionAux
    }else{

      this.listGuiaRemision = this.listGuiaRemisionAux.filter((item: any) => item.gur_id.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1  );

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

        if(this.control){
          this.listGuiaRemision.forEach((item: any, index: any)=>{
            item.gur_fecha = this.transformDate(item.gur_fecha)

          })
        }

        this.control = false
        this.sub.unsubscribe()

      }
      
    });

  }

  irListaVins(codigo_guia: number){

    console.log(codigo_guia);
    
  }

  onPageIndexChange($event: any) {
    //do something here to go to next page
    console.log($event);
    
  }

  modalInfoGuia(guia: any){
    console.log('modaaaaaaaaaaaaaaaaaaaa');
    console.log(guia);
    
    this.modalGuia = true
    this.itemGuia = guia.recepcion
  }

  cerrarModalGuia(){
    this.modalGuia = false
  }

  transformDate(newDate: any): any{
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    let fecha = dia + " de "+ mes +" del "+anio

    return fecha
  }



}
