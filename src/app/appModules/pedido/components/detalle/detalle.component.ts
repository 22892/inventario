import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

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


  constructor(private servicePedido: PedidoService,
    private router: Router,
    private msg: NzMessageService,
    private rutaActiva: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.veh_codigo = this.rutaActiva.snapshot.paramMap.get('vin')
    console.log('vinnnnn');
    console.log(this.veh_codigo);
    this.getVinDetalle(this.veh_codigo)
    
    
  }
  
  getVinDetalle(veh_vin: any){

    this.cargandoDatosVin = true
    this.servicePedido.getDetalleVin(veh_vin).subscribe(
      data => {
          
        console.log('respuesta---');
        console.log(data);
        
        if(data){
          this.detalleVin = data
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



}
