import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'
import { formatDate } from '@angular/common';
import { AuthService } from '../../../core/auth.service'


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl: string = '';

  private listVin: any[] = [];

  private vin$! : BehaviorSubject<any>;
  private vinFecha$! : BehaviorSubject<any>;

  private listEstadoVin:any[] =[] ;
  private estadovin$! : BehaviorSubject<any>;

  private listDetalleEstadoVin:any[] =[] ;
  private detallevin$! : BehaviorSubject<any>;

  private renviarVinCurbe:any[] =[] ;
  private reenviarVin$! : BehaviorSubject<any>;

  public updateListaVins: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService,
    private serviceAuth: AuthService) {

      this.baseUrl = baseUrl;
      this.vin$ = new BehaviorSubject({listVin:[],cargando:false, control: false});
      this.vinFecha$ = new BehaviorSubject({listVin:[],cargando:false, control: false});
      this.estadovin$ = new BehaviorSubject({listEstadoVin:[],cargando:false});
      this.detallevin$ = new BehaviorSubject({listDetalleEstadoVin:[],cargando:false});
      this.reenviarVin$ = new BehaviorSubject({renviarVinCurbe:[],cargando:false});
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+this.serviceAuth.token
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


  reenviarVinCurbe$(veh_codigo: any): Observable<any> {

    if(this.renviarVinCurbe)
      this.reenviarVin(veh_codigo);
    return this.reenviarVin$.asObservable();
  }

  reenviarVin(veh_codigo: any){
    let marca = this.serviceGlobal.getCodigoMarca()

    this.renviarVinCurbe = [];
    this.reenviarVin$.next({ renviarVinCurbe: this.renviarVinCurbe, cargando: true });

    this.http.get(`${this.baseUrl}api/vehiculo/uploadCurbe/${marca}/${veh_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.reenviarVin$.next({ renviarVinCurbe: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al Reenviar Vins');
        this.reenviarVin$.next({ renviarVinCurbe: [], cargando: false });
      }
    });

  }



  getListAllDetalleEstadosVin$(veh_codigo: any): Observable<any> {

    if(this.listDetalleEstadoVin)
      this.getDetalleEstadosVins(veh_codigo);
    return this.detallevin$.asObservable();
  }

  getDetalleEstadosVins(veh_codigo: any){
    let marca = this.serviceGlobal.getCodigoMarca()

    this.listDetalleEstadoVin = [];
    this.detallevin$.next({ listDetalleEstadoVin: this.listDetalleEstadoVin, cargando: true });
    //console.log(`${this.baseUrl}api/vehiculo/detalleEstado/${marca}/${veh_codigo}`);

    this.http.get(`${this.baseUrl}api/vehiculo/detalleEstado/${marca}/${veh_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.detallevin$.next({ listDetalleEstadoVin: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Detalle Estados Vins');
        this.detallevin$.next({ listDetalleEstadoVin: [], cargando: false });
      }
    });

  }



  getListAllEstadosVin$(): Observable<any> {

    if(this.listEstadoVin)
      this.getEstadosVins();
    return this.estadovin$.asObservable();
  }

  getEstadosVins(){
    let marca = this.serviceGlobal.getCodigoMarca()

    this.listEstadoVin = [];
    this.estadovin$.next({ listEstadoVin: this.listEstadoVin, cargando: true });
    //console.log(`${this.baseUrl}api/vehiculo/getAllEstados/${marca}`);

    this.http.get(`${this.baseUrl}api/vehiculo/getAllEstados/${marca}`,this.httpOptions).subscribe({
      next: (data) => {

        this.estadovin$.next({ listEstadoVin: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Estados Vins');
        this.estadovin$.next({ listEstadoVin: [], cargando: false });
      }
    });

  }


  updateListAllVinMarca(gur_codigo: any){
    this.getVinsMarca(gur_codigo);
  }



  getListAllVinMarca$(gur_codigo: any): Observable<any> {

    if(this.listVin){
      this.getVinsMarca(gur_codigo);
    }else{
      this.vin$.subscribe((x)=>{
        x.control = false
      })

    }
    return this.vin$.asObservable();
  }
  getListAllVins$(gur_codigo: any): Observable<any> {

    if(this.listVin){
      this.getVinsTotal();
    }else{
      this.vin$.subscribe((x)=>{
        x.control = false
      })

    }
    return this.vin$.asObservable();
  }

  getVinsMarca(gur_codigo: any){

    let marca = this.serviceGlobal.getCodigoMarca()
    let cod_empresa = this.serviceGlobal.getCodigoEmpresa()

    //console.log('codigo empresaaaa');
    //console.log(cod_empresa);


    this.listVin = [];
    this.vin$.next({ listVin: this.listVin, cargando: true, control: true });
    //console.log(`${this.baseUrl}api/vehiculo/getAllVehiculosMarca/${marca}/${0}/${gur_codigo}`);

    this.http.get(`${this.baseUrl}api/vehiculo/getVehiculoByGuia/${marca}/${cod_empresa}/${gur_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.vin$.next({ listVin: data, cargando: false, control: true});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listado de Vins');
        this.vin$.next({ listVin: [], cargando: false, control: true });
      }
    });

  }
  getVinsTotal(){

    let marca = this.serviceGlobal.getCodigoMarca()
    let cod_empresa = this.serviceGlobal.getCodigoEmpresa()

    //console.log('tokrnnnnnnnnnnnnnnn');
    //console.log(this.httpOptions);


    this.listVin = [];
    this.vin$.next({ listVin: this.listVin, cargando: true, control: true });
    //console.log(`${this.baseUrl}api/vehiculo/getAllVehiculos/${marca}`);

    this.http.get(`${this.baseUrl}api/vehiculo/getAllVehiculos/${marca}`,this.httpOptions).subscribe({
      next: (data) => {

        this.vin$.next({ listVin: data, cargando: false, control: true});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listado de Vins');
        this.vin$.next({ listVin: [], cargando: false, control: true });
      }
    });

  }



  getListAllVin$(): Observable<any> {

    if(this.listVin)
      this.getVins();
    return this.vin$.asObservable();
  }

  getVins(){
    let emp_codigo = this.serviceGlobal.getCodigoEmpresa()
    //console.log('codigo empresa');
    //console.log(emp_codigo);

    this.listVin = [];
    this.vin$.next({ listVin: this.listVin, cargando: true });

    this.http.get(`${this.baseUrl}api/vehiculo/getAllVehiculos`,this.httpOptions).subscribe({
      next: (data) => {

        this.vin$.next({ listVin: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Vins');
        this.vin$.next({ listVin: [], cargando: false });
      }
    });

  }


  getAllVinsFechas$(): Observable<any>{


    this.getListVinByFecha();

    this.vinFecha$.subscribe((x)=>{
      x.control = true
    })



    return this.vinFecha$.asObservable();
  }

  getListVinByFecha(){
    this.listVin = [];
    this.vinFecha$.next({listVin:this.listVin,cargando:true, control: true});
    let desde = this.serviceGlobal.getFechaDesde();
    let hasta = this.serviceGlobal.getFechaHasta();
    let marca = this.serviceGlobal.getCodigoMarca()

    this.http.get<any>(`${this.baseUrl}api/vehiculo/getAllVehiculosByFecha/${marca}/${formatDate(desde,'yyyy-MM-dd','es')}/${formatDate(hasta,'yyyy-MM-dd','es')}`,this.httpOptions ).subscribe({
      next: (data) => {
        this.vinFecha$.next({listVin:data,cargando:false, control: true});
      },
      error: (err) => {
        this.createNotification('error','Error','ha ocurrido un error al obtener Vins por Fechas');
        this.vinFecha$.next({listVin:[],cargando:false, control: true});
      }
    });
  }


  uploadFileExelLogistica(file:any):Observable<any>{
    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/observacion/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      //observe: 'events',
      headers: new HttpHeaders({
        'Authorization': `Bearer `+this.serviceAuth.token
      })
    });
  }


  uploadFileExelPedido(file:any):Observable<any>{
    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/pedido/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      //observe: 'events',
      headers: new HttpHeaders({
        'Authorization': `Bearer `+this.serviceAuth.token
      })
    });
  }

  uploadFileExelFactura(file:any):Observable<any>{


    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/factura/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      //observe: 'events',
      headers: new HttpHeaders({
        'Authorization': `Bearer `+this.serviceAuth.token
      })
    });
  }

  uploadFileExelNacionalizacion(file:any):Observable<any>{

    let marca = this.serviceGlobal.getCodigoMarca()

    return this.http.post(`${this.baseUrl}api/nacionalizacion/upload_document_excel/${marca}`, file,{
      reportProgress: true,
      //observe: 'events',
      headers: new HttpHeaders({
        'Authorization': `Bearer `+this.serviceAuth.token
      })
    });
  }



  getDetalleVin(vin:any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    //console.log(`${this.baseUrl}api/vehiculo/detalle/${marca}/${vin}`);

    return this.http.get(`${this.baseUrl}api/vehiculo/detalle/${marca}/${vin}`, {

        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+this.serviceAuth.token
        }),

    });
  }



  downloadPDFRecepcion(vin: any,): Observable<any> {

    
    let marca = this.serviceGlobal.getCodigoMarca()
    let empresa = this.serviceGlobal.getCodigoEmpresa()
    console.log('usuario');
    
    console.log(`${this.baseUrl}api/vehiculo/getVehiculoPDFEntrega/${marca}/${vin}`  );
    

    return this.http.get(
      `${this.baseUrl}api/vehiculo/getVehiculoPDFEntrega/${marca}/${vin}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/pdf',
          'Authorization': `Bearer `+this.serviceAuth.token
        },
        ),
        reportProgress: true,
        responseType: 'blob',
      }
    );
  }



}
