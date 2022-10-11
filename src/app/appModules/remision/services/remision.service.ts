import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'
import { AuthService } from '../../../core/auth.service'

@Injectable({
  providedIn: 'root'
})
export class RemisionService {

  baseUrl: string = '';
  private listGuiaRemision: any[] = [];
  private guia$! : BehaviorSubject<any>;


  private listGuiaFinalizada: any[] = [];
  private guiafinalizada$! : BehaviorSubject<any>;


  private listGuiaPendiente: any[] = [];
  private guiapendiente$! : BehaviorSubject<any>;

  public updateListaRemision: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService,
    private serviceAuth: AuthService) {

      this.baseUrl = baseUrl;
      this.guia$ = new BehaviorSubject({listGuiaRemision:[],cargando:false, control: false});
      this.guiafinalizada$ = new BehaviorSubject({listGuiaFinalizada:[],cargando:false, control: false});
      this.guiapendiente$ = new BehaviorSubject({listGuiaPendiente:[],cargando:false, control: false});


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


  filterDate(valueSearch: any){
    const query = {}
    //console.log('llega data');
    //console.log(valueSearch.value);


    let lista: any[]
    lista = this.serviceGlobal.getListGuiaRemision()

    //console.log('lista guardada');
    //console.log(lista);


    this.listGuiaRemision = lista.filter((item: any) => item.veh_vin.toUpperCase().indexOf(valueSearch.value.toUpperCase()) !== -1 || item.veh_motor.toUpperCase().indexOf(valueSearch.value.toUpperCase()) !== -1 || item.veh_modelo.toUpperCase().indexOf(valueSearch.value.toUpperCase()) !== -1);
    //console.log('lista filtrada');
    //console.log(this.listGuiaRemision);

    this.guia$.next({ listGuiaRemision: [], cargando: false, control: true});


  }

  getListAllRemision$(): Observable<any> {

    if(this.listGuiaRemision){
      this.getListRemision();
    }else{

      this.guia$.subscribe((x)=>{
        x.control = false
      })

    }
    return this.guia$.asObservable();
  }

  getListRemision(){

    //console.log('tokeenn');

    //console.log(this.httpOptions);

    let marca = this.serviceGlobal.getCodigoMarca()
    let empresa = this.serviceGlobal.getCodigoEmpresa()

    this.listGuiaRemision = [];
    this.guia$.next({ listGuiaRemision: this.listGuiaRemision, cargando: true, control: true });

    this.http.get(`${this.baseUrl}api/guia/getAllGuiasMovil/${marca}/${empresa}/${this.serviceAuth.user.usr_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.guia$.next({ listGuiaRemision: data, cargando: false, control: true});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listado de Remisiones');
        this.guia$.next({ listGuiaRemision: [], cargando: false, control: true });
      }
    });

  }


  updateListasRemisiones(mes: number, anio: number){
    this.getListRemisionFinalizada(mes, anio)
    this.getListRemisionPendientes()
  }


  getListAllRemisionFinalizada$(mes: number, anio: number): Observable<any> {

    if(this.listGuiaFinalizada){
      this.getListRemisionFinalizada(mes, anio);
    }else{

      this.guiafinalizada$.subscribe((x)=>{
        x.control = false
      })

    }
    return this.guiafinalizada$.asObservable();
  }


  getListRemisionFinalizada(mes: number, anio: number){

    let marca = this.serviceGlobal.getCodigoMarca()
    let empresa = this.serviceGlobal.getCodigoEmpresa()

    this.listGuiaFinalizada = [];
    this.guiafinalizada$.next({ listGuiaFinalizada: this.listGuiaFinalizada, cargando: true, control: true });
    console.log(`${this.baseUrl}api/guia/getAllGuiasMovilFinalizado/${marca}/${empresa}/${this.serviceAuth.user.usr_codigo}/${mes}/${anio}`);
    
    this.http.get(`${this.baseUrl}api/guia/getAllGuiasMovilFinalizado/${marca}/${empresa}/${this.serviceAuth.user.usr_codigo}/${mes}/${anio}`,this.httpOptions).subscribe({
      next: (data) => {

        this.guiafinalizada$.next({ listGuiaFinalizada: data, cargando: false, control: true});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'HA OCURRIDO UN ERROR AL LISTRA GUIAS FINALIZADAS');
        this.guiafinalizada$.next({ listGuiaFinalizada: [], cargando: false, control: true });
      }
    });

  }


  
  getListAllRemisionPendiente$(): Observable<any> {

    if(this.listGuiaPendiente){
      this.getListRemisionPendientes();
    }else{

      this.guiapendiente$.subscribe((x)=>{
        x.control = false
      })

    }
    return this.guiapendiente$.asObservable();
  }

  getListRemisionPendientes(){

    let marca = this.serviceGlobal.getCodigoMarca()
    let empresa = this.serviceGlobal.getCodigoEmpresa()

    this.listGuiaPendiente = [];
    this.guiapendiente$.next({ listGuiaPendiente: this.listGuiaPendiente, cargando: true, control: true });

    this.http.get(`${this.baseUrl}api/guia/getAllGuiasMovilPendiente/${marca}/${empresa}/${this.serviceAuth.user.usr_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.guiapendiente$.next({ listGuiaPendiente: data, cargando: false, control: true});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'HA OCURRIDO UN ERROR AL LISTRA GUIAS PENDIENTES');
        this.guiapendiente$.next({ listGuiaPendiente: [], cargando: false, control: true });
      }
    });

  }



  finalizarRecepcionVins(objetoRecepcion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/guia/finalizarEntrega`, objetoRecepcion, this.httpOptions);
  }




}
