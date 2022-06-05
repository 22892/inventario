import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'
import { AuthService } from '../../../core/auth.service'

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {

  baseUrl: string = '';

  private listGrupos: any[] = [];
  private grupos$!: BehaviorSubject<any>;

  private listTamano: any[] = [];
  private tamano$!: BehaviorSubject<any>;

  private listDano: any[] = [];
  private dano$!: BehaviorSubject<any>;


  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService,
    private serviceAuth: AuthService) {

      this.baseUrl = baseUrl;

      this.grupos$ = new BehaviorSubject({listGrupos:[],cargando:false});
      this.tamano$ = new BehaviorSubject({listTamano:[],cargando:false});
      this.dano$ = new BehaviorSubject({listDano:[],cargando:false});


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


  //OBTENER LISTADO DE GRUPOS PARA OBSERVACIÓN

  getListAllGrupos$(): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listGrupos)
      this.getGrupos(marca);
    return this.grupos$.asObservable();
  }

  getGrupos(marca: any){

    this.listGrupos = [];
    this.grupos$.next({ listGrupos: this.listGrupos, cargando: true });
    console.log(`${this.baseUrl}api/observacion/getGupos/${marca}`);
    
    this.http.get(`${this.baseUrl}api/observacion/getGupos/${marca}`,this.httpOptions).subscribe(
      data => {

        this.grupos$.next({ listGrupos: data, cargando: false});
      },
      err => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listar los Grupos Revisión');
        this.grupos$.next({ listGrupos: [], cargando: false });
      }
    );    

  }

  
  //OBTENER LISTADO DE TAMAÑOS PARA OBSERVACIÓN

  getListAllTamano$(): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listTamano)
      this.getTamano(marca);
    return this.tamano$.asObservable();
  }

  getTamano(marca: any){
    
    this.listTamano = [];
    this.tamano$.next({ listTamano: this.listTamano, cargando: true });
    
    this.http.get(`${this.baseUrl}api/observacion/getTamano/${marca}`,this.httpOptions).subscribe(
      data => {

        this.tamano$.next({ listTamano: data, cargando: false});
      },
      err => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listar los Tamaños para Revisión');
        this.tamano$.next({ listTamano: [], cargando: false });
      }
    );    

  }


  //OBTENER LISTADO DE DAÑOS PARA OBSERVACIÓN

  getListAllDano$(): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listDano)
      this.getDano(marca);
    return this.dano$.asObservable();
  }

  getDano(marca: any){

    this.listDano = [];
    this.dano$.next({ listDano: this.listDano, cargando: true });
    
    this.http.get(`${this.baseUrl}api/observacion/getDanos/${marca}`,this.httpOptions).subscribe(
      data => {

        this.dano$.next({ listDano: data, cargando: false});
      },
      err => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al listar los Daños para Revisión');
        this.dano$.next({ listDano: [], cargando: false });
      }
    );    

  }


  // CREAR GRUPO PARTE

  createGrupo(grupo: any): Observable<any> {
    console.log(`${this.baseUrl}api/observacion/createGParte/`);
    
    return this.http.post(`${this.baseUrl}api/observacion/createGParte/`, grupo, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  // ACTUALIZAR GRUPO PARTE

  updateGrupo(grupo: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/updateGParte/`, grupo, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }

  


  // CREAR PARTE

  createParte(parte: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/createParte/`, parte, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  // ACTUALIZAR PARTE

  updateParte(parte: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/updateParte/`, parte, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  // CREAR DAÑO

  createDano(dano: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/createDano/`, dano, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  // ACTUALIZAR DAÑO

  updateDano(dano: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/updateDano/`, dano, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }

  // CREAR TAMAÑO

  createTamano(tamano: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/createTamano/`, tamano, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  // ACTUALIZAR TAMAÑO

  updateTamano(tamano: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/updateTamao/`, tamano, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }



  //REALIZAR OBSERVACION VIN


  createObservacionVin(listarevision: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}api/observacion/create/`, listarevision, {
      headers: new HttpHeaders({
     
        Authorization: 'Bearer ' + this.serviceAuth.token,
      }),
    });
  }






}
