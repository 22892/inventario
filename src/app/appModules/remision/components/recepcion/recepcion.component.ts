import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad'
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute} from '@angular/router';
import { RemisionService } from '../../services/remision.service'
import { GlobalserviceService } from '../../../../core/globalservice.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent implements OnInit, AfterViewInit {


  @ViewChild('firmaConductor', { static: true }) signaturePadElement: any;
  signaturePadE: any

  @ViewChild('firmaRecepcion', { static: true }) signaturePadElementR: any;
  signaturePadR: any

  size: NzButtonSize = 'large';
  observacion: string = ""
  codigo_guia: any
  urlConductor: any
  urlRecepcion: any
  loadingRecepcion: boolean = false

  constructor( private msg: NzMessageService,
    private rutaActiva: ActivatedRoute,
    private serviceRemision: RemisionService,
    private serviceGlobal: GlobalserviceService,
    private router: Router,) {

    this.codigo_guia = this.rutaActiva.snapshot.paramMap.get('guia')

  }

  ngAfterViewInit(): void {
    console.log('mmmmmmmm');
    this.signaturePadE = new SignaturePad(this.signaturePadElement.nativeElement)
    this.signaturePadR = new SignaturePad(this.signaturePadElementR.nativeElement)
  }


  ngOnInit(): void {
  }

  limpiarFirmas(){
    this.signaturePadE.clear()
    this.signaturePadR.clear()
  }

  generarRecepcion(){

    console.log('metodo reccion');
    console.log(this.observacion);

    if(this.signaturePadE.isEmpty() || this.signaturePadR.isEmpty()){
      this.msg.info('TIENE QUE REALIZAR LAS FIRMAS')

    }else{

      this.urlConductor = this.signaturePadE.toDataURL()
      this.urlRecepcion = this.signaturePadR.toDataURL()


      var arrayFirmaConductor = this.urlConductor.split(',');
      var arrayFirmaRecepcion = this.urlRecepcion.split(',');


      console.log('ararrra');
      
      console.log(arrayFirmaConductor[0]);
      

      var objetoRecepcion = {
        rec_usu_codigo: this.serviceGlobal.getCodigoUsuario(), 
        rec_gur_codigo: parseInt(this.codigo_guia),
        rec_marca:  this.serviceGlobal.getCodigoMarca(),
        rec_observacion: this.observacion,
        rec_firma_conductor: arrayFirmaConductor[1],
        rec_firma_recepcion: arrayFirmaRecepcion[1]
      }

      console.log(objetoRecepcion);
      this.loadingRecepcion = true

      this.serviceRemision.finalizarRecepcionVins(objetoRecepcion).subscribe({
        next: (data) => {
          
          console.log(data);
          
          this.msg.success('RECEPCIÓN FINALIZADA')
          this.signaturePadE.clear()
          this.signaturePadR.clear()
          this.observacion = ""
          this.router.navigate(['/remision/lista'])
          this.loadingRecepcion = false
        },
        error: (err) => {
          this.msg.error(`HA OCURRIDO UN ERROR AL FINALIZAR RECEPCIÓN, ${err.error.message}`);
          this.loadingRecepcion = false
        }
      })

      
    }
    
    
  }

  regresar(){
    this.router.navigate(['/remision/lista'])

  }

}
