import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable} from 'rxjs';
import { PedidoService } from '../../services/pedido.service';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';


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
  selector: 'app-vins',
  templateUrl: './vins.component.html',
  styleUrls: ['./vins.component.scss']
})
export class VinsComponent implements OnInit {


  listOfColumns: ColumnItem[] = [
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
     
     },
    
 
     {
      width:'40px',
      name: 'Verificación',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null,
     
    },

    
 
   ];
 

  codigo_guia: any
  listVin: any[] = []
  listVinAux: any [] = []
  vin$!: Observable<any>;
  cargandoVins: boolean = false
  sub:any
  buscarVins: string = ""


  constructor(private rutaActiva: ActivatedRoute,
    private servicePedido: PedidoService,
    private router: Router,
    ) {

    this.codigo_guia = this.rutaActiva.snapshot.paramMap.get('guia')

   }

  ngOnInit(): void {
    this.getListVins()
  }

  filtroBuscarVin(){

  }

  inicio(){

    this.router.navigate(['/remision/lista']);
  }

  getListVins(){


    this.vin$ = this.servicePedido.getListAllVinMarca$(this.codigo_guia)

    this.sub = this.vin$.subscribe(p => {

      //console.log('vinsss x guiaaaaa------');
      //console.log(p);
      this.listVin = p.listVin
      this.listVinAux = p.listVin
      this.cargandoVins = p.cargando

      
    });

  }



}
