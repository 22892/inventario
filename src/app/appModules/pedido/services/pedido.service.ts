import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl: string = '';

  private listVin:any[] =[] ;
  private vin$! : BehaviorSubject<any>;


  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService) {

      this.baseUrl = baseUrl;
      this.vin$ = new BehaviorSubject({listVin:[],cargando:false});
    
      
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer `+this.auth.token
    })
  };



  createNotification(type: string, titulo: string, mensaje: string): void {
    this.notification.create(
      type,
      titulo,
      mensaje,
      { nzPlacement: 'bottomLeft' }
    );
  }


  getListAllVinMarca$(): Observable<any> {
   
    if(this.listVin)
      this.getVinsMarca();
    return this.vin$.asObservable();
  }

  getVinsMarca(){
   
    let marca = this.serviceGlobal.getCodigoMarca()
    this.listVin = [];
    this.vin$.next({ listVin: this.listVin, cargando: true });
    
    this.http.get(`${this.baseUrl}api/vehiculo/getAllVehiculosMarca/${marca}`,this.httpOptions).subscribe(
      data => {

        this.vin$.next({ listVin: data, cargando: false});
      },
      err => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listado de Vins');
        this.vin$.next({ listVin: [], cargando: false });
      }
    );    

  }



  getListAllVin$(): Observable<any> {
   
    if(this.listVin)
      this.getVins();
    return this.vin$.asObservable();
  }

  getVins(){
    let emp_codigo = this.serviceGlobal.getCodigoEmpresa()
    console.log('codigo empresa');
    console.log(emp_codigo);
    
    this.listVin = [];
    this.vin$.next({ listVin: this.listVin, cargando: true });
    
    this.http.get(`${this.baseUrl}api/vehiculo/getAllVehiculos`,this.httpOptions).subscribe(
      data => {

        this.vin$.next({ listVin: data, cargando: false});
      },
      err => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Vins');
        this.vin$.next({ listVin: [], cargando: false });
      }
    );    

  }


  getAllVinsFechas$(): Observable<any>{

    
    this.getListVinByFecha();
    
    this.vin$.subscribe((x)=>{
      x.control = true
    })
    

   
    return this.vin$.asObservable();
  }
   
  getListVinByFecha(){
    this.listVin = [];
    this.vin$.next({listVin:this.listVin,cargando:true, control: true});
    let desde = this.serviceGlobal.getFechaDesde();
    let hasta = this.serviceGlobal.getFechaHasta();
    let marca = this.serviceGlobal.getCodigoEmpresa()
    console.log(`${this.baseUrl}api/vehiculo/getAllVehiculosByFecha/${marca}/${formatDate(desde,'yyyy-MM-dd','es')}/${formatDate(hasta,'yyyy-MM-dd','es')}`);
    
    this.http.get<any>(`${this.baseUrl}api/vehiculo/getAllVehiculosByFecha/${marca}/${formatDate(desde,'yyyy-MM-dd','es')}/${formatDate(hasta,'yyyy-MM-dd','es')}`,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",  
        //"Authorization":"Bearer " + this.auth.token      
      })
    } ).subscribe(
      data => {
        this.vin$.next({listVin:data,cargando:false, control: true});
      },
      err => {
        this.createNotification('error','Error','ha ocurrido un error al obtener Vins por Fechas');
        this.vin$.next({listVin:[],cargando:false, control: true});
      }
    );
  }



  uploadFileExelPedido(file:any):Observable<any>{
    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/pedido/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        //"Authorization":"Bearer " + this.auth.token      
      })
    });
  }

  uploadFileExelFactura(file:any):Observable<any>{

  
    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/factura/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        //"Authorization":"Bearer " + this.auth.token      
      })
    });
  }

  uploadFileExelNacionalizacion(file:any):Observable<any>{
   
    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/nacionalizacion/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        //"Authorization":"Bearer " + this.auth.token      
      })
    });
  }



  getDetalleVin(vin:any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    console.log(`${this.baseUrl}api/vehiculo/detalle/${marca}/${vin}`);
    
    return this.http.get(`${this.baseUrl}api/vehiculo/detalle/${marca}/${vin}`, {
      
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //Authorization: 'Bearer ' + this.auth.token,
        }),
      
    });
  }




}
