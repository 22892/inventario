import { Component, OnInit } from '@angular/core';
import { RemisionService } from '../../services/remision.service'
import { Observable} from 'rxjs';
import { SpinerService } from '../../../../core/spiner.service'
import { GlobalserviceService } from '../../../../core/globalservice.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  listGuiaRemision: any[] = [{codigo: 1, name: 'Guia 1', conductor: 'Jimi Ortiz', placa: 'HAP-1234', estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 2, name: 'Guia 1', conductor: 'Pedro Ortiz', placa: 'PLP-1234' , estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 3, name: 'Guia 3', conductor: 'Karina Perez', placa: 'LAP-1234', estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 4, name: 'Guia 4', conductor: 'Juan Ortiz', placa: 'TYP-1234', estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 5, name: 'Guia 5', conductor: 'Alvaro Gonzales', placa: 'AOL-1234', estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 6, name: 'Guia 6', conductor: 'Mauricio Avila', placa: 'XCP-1234',estado:{codigo: 1, estado:'Pendiente'}},
                             {codigo: 7, name: 'Guia 7', conductor: 'Mario Ochoa', placa: 'AKK-1234',estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 8, name: 'Guia 8', conductor: 'Carlos Perez', placa: 'WWP-1234',estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 9, name: 'Guia 9', conductor: 'Kiara Pezantes', placa: 'MAP-1234',estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 10, name: 'Guia 10', conductor: 'Jhon Ortiz', placa: 'BYP-1234',estado:{codigo: 1, estado:'Pendiente'}},
                             {codigo: 11, name: 'Guia 11', conductor: 'Paola Alvarez', placa: 'NNP-1234',estado:{codigo: 1, estado:'Pendiente'}}, {codigo: 12, name: 'Guia 12', conductor: 'Oswaldo Tapia', placa: 'AAP-1234',estado:{codigo: 2, estado:'Finalizado'}},
                             {codigo: 13, name: 'Guia 13', conductor: 'Talia Merino', placa: 'LLP-1234',estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 14, name: 'Guia 14', conductor: 'Juan Coro', placa: 'UPP-1234',estado:{codigo: 1, estado:'Pendiente'}},
                             {codigo: 15, name: 'Guia 15', conductor: 'Karmita Lazo', placa: 'AAS-1234',estado:{codigo: 2, estado:'Finalizado'}}, {codigo: 15, name: 'Guia 15', conductor: 'Pedro Ortiz', placa: 'UPP-1234',estado:{codigo: 1, estado:'Pendiente'}}]

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

  constructor(private serviceRemision: RemisionService,
    private serviceGlobal: GlobalserviceService,
    private router: Router,) {

   
  }

  ngOnInit(): void {
    this.getListVins()

  }

  inicio(){

    this.router.navigate(['/remision/lista'])

  }

  filtroBuscarGuia(){
    if (this.buscarGuia == '' || this.buscarGuia == null) {
      this.listGuiaRemision = this.listGuiaRemisionAux
    }else{
      console.log(this.buscarGuia);
      this.listGuiaRemision = this.listGuiaRemisionAux.filter((item: any) => item.name.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1 || item.conductor.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1 || item.placa.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1 || item.estado.estado.toUpperCase().replace(/ /g, '').indexOf(this.buscarGuia.toUpperCase().replace(/ /g, '')) !== -1);

    }


  }

  
  actualizarFecha(e: any) {
    if (!e) {
    

    }
  }

  reloadGuias(){

  }


  getListVins(){


    this.guia$ = this.serviceRemision.getListAllRemision$()
    
    this.sub = this.guia$.subscribe(p => {
      
      console.log('mmmmmmmmm');
      console.log(p);
      
      
      //this.listGuiaRemision = p.listGuiaRemision
      //this.listGuiaRemisionAux = p.listGuiaRemision
      this.cargandoRemision = p.cargando

      if(this.cargandoRemision == false){

        this.listGuiaRemisionAux = this.listGuiaRemision

        this.listGuiaRemision.forEach((item: any, index: any)=>{
        
        })
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


}