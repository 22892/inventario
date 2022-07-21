import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'


@Injectable({
  providedIn: 'root'
})
export class RemisionService {

  baseUrl: string = '';
  private listGuiaRemision!: any[];
  private guia$! : BehaviorSubject<any>;

  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService) {

      this.baseUrl = baseUrl;
      this.guia$ = new BehaviorSubject({listGuiaRemision:[],cargando:false, control: false});

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


  filterDate(valueSearch: any){
    const query = {}
    console.log('llega data');
    console.log(valueSearch.value);


    let lista: any[]
    lista = this.serviceGlobal.getListGuiaRemision()

    console.log('lista guardada');
    console.log(lista);
    
    
    this.listGuiaRemision = lista.filter((item: any) => item.veh_vin.toUpperCase().indexOf(valueSearch.value.toUpperCase()) !== -1 || item.veh_motor.toUpperCase().indexOf(valueSearch.value.toUpperCase()) !== -1 || item.veh_modelo.toUpperCase().indexOf(valueSearch.value.toUpperCase()) !== -1);
    console.log('lista filtrada');
    console.log(this.listGuiaRemision);
    
    this.guia$.next({ listGuiaRemision: [], cargando: false, control: true});
    

  }

  getListAllRemision$(): Observable<any> {
   
    if(!this.listGuiaRemision){
      this.getListRemision();
    }else{
      this.guia$.subscribe((x)=>{
        x.control = false
      })

    }
    return this.guia$.asObservable();
  }

  getListRemision(){
   
    let marca = this.serviceGlobal.getCodigoMarca()

    this.listGuiaRemision = [];
    this.guia$.next({ listGuiaRemision: this.listGuiaRemision, cargando: true, control: true });
    
    this.http.get(`${this.baseUrl}api/guia/getAllGuias/${marca}`,this.httpOptions).subscribe({
      next: (data) => {

        this.guia$.next({ listGuiaRemision: data, cargando: false, control: true});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listado de Remisiones');
        this.guia$.next({ listGuiaRemision: [], cargando: false, control: true });
      }
    });    

  }



}
