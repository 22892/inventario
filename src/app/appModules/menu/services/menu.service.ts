import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl: string = '';

  private listMenuPadre: any[] = [];
  private menupadre$!: BehaviorSubject<any>;

  private listMenuAsignacion: any[] = [];
  private menuasignacion$!: BehaviorSubject<any>;

  private listRol: any[] = [];
  private rol$!: BehaviorSubject<any>;

  private listRolAsignacion: any[] = [];
  private rolasignacion$!: BehaviorSubject<any>;

  private listPermisoAsignacion: any[] = [];
  private permisoasignacion$!: BehaviorSubject<any>;


  public updateMenuPrincipal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private listEmpresa: any[] = [];
  private empresa$!: BehaviorSubject<any>;



  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService) {

      this.baseUrl = baseUrl;
      this.menupadre$ = new BehaviorSubject({listMenuPadre:[],cargando:false});
      this.menuasignacion$ = new BehaviorSubject({listMenuAsignacion:[],cargando:false});
      this.rol$ = new BehaviorSubject({listRol:[],cargando:false});
      this.rolasignacion$ = new BehaviorSubject({listRolAsignacion:[],cargando:false});
      this.permisoasignacion$ = new BehaviorSubject({listPermisoAsignacion:[],cargando:false});
      this.empresa$ = new BehaviorSubject({listEmpresa:[],cargando:false});

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


  // CREAR MENUS

  createMenus(menu: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/menu/create/${marca}`, menu, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }

  //ACTUALIZAR MENUS

  updateMenus(menu: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/menu/update/${marca}`, menu, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  //OBTENER LISTADO DE MENUS

  getListAllMenuPadre$(men_padre: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listMenuPadre)
      this.getMenus(marca, men_padre);
    return this.menupadre$.asObservable();
  }

  getMenus(marca: any, men_padre: any){

    this.listMenuPadre = [];
    this.menupadre$.next({ listMenuPadre: this.listMenuPadre, cargando: true });
    console.log(`${this.baseUrl}api/menu/getAll/${marca}/${men_padre}`);
    
    this.http.get(`${this.baseUrl}api/menu/getAll/${marca}/${men_padre}`,this.httpOptions).subscribe({
      next: (data) => {

        this.menupadre$.next({ listMenuPadre: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Menu Principal');
        this.menupadre$.next({ listMenuPadre: [], cargando: false });
      }
    });    

  }


  //LISTADO DE MENUS ASIGNADOS Y POR ASIGNAR

  getListAllMenuAsignacion$(men_padre: any, plataforma: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listMenuAsignacion)
      this.getMenusAsignacion(marca, men_padre, plataforma);
    return this.menuasignacion$.asObservable();
  }

  getMenusAsignacion(marca: any, men_padre: any, plataforma: any){
    this.listMenuAsignacion = [];
    this.menuasignacion$.next({ listMenuAsignacion: this.listMenuAsignacion, cargando: true });
    
    this.http.get(`${this.baseUrl}api/menu/getAllSinHijos/${marca}/${men_padre}/${plataforma}`,this.httpOptions).subscribe({
      next: (data) => {

        this.menuasignacion$.next({ listMenuAsignacion: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al obtener listado de asignacion menu');
        this.menuasignacion$.next({ listMenuAsignacion: [], cargando: false });
      }
    });    

  }


  //CREARCION DE ROLES


  createRol(rol: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/create_rol/${marca}`, rol, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  //OBTENER LISTADO DE ROLES

  getListAllRol$(): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listRol)
      this.getRoles(marca);
    return this.rol$.asObservable();
  }

  getRoles(marca: any){
    
    this.listRol = [];
    this.rol$.next({ listRol: this.listRol, cargando: true });
    
    this.http.get(`${this.baseUrl}api/gestionusuario/getAllRol/${marca}`,this.httpOptions).subscribe({
      next: (data) => {

        this.rol$.next({ listRol: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Roles');
        this.rol$.next({ listRol: [], cargando: false });
      }
    });    

  }


  //LISTADO DE ROLES ASIGNADOS Y POR ASIGNAR PARA MENUS

  getListAllRolesAsignacion$( rol_codigo: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listRolAsignacion)
      this.getRolAsignacion(marca, rol_codigo);
    return this.rolasignacion$.asObservable();
  }

  getRolAsignacion(marca: any, rol_codigo: any){
    
    this.listRolAsignacion = [];
    this.rolasignacion$.next({ listRolAsignacion: this.listRolAsignacion, cargando: true });
    
    this.http.get(`${this.baseUrl}api/gestionusuario/getAllMenuRol/${marca}/${rol_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.rolasignacion$.next({ listRolAsignacion: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'Ha ocurrido un error al obtener listado de asignaciones para Rol');
        this.rolasignacion$.next({ listRolAsignacion: [], cargando: false });
      }
    });    

  }

  
  //LISTADO DE PERMISOS PARA ASIGNACION A ROLES
  
  
  getListAllPermisoAsignacion$(rol_codigo: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listPermisoAsignacion)
      this.getPermisoAsignacion(marca, rol_codigo);
    return this.permisoasignacion$.asObservable();
  }

  getPermisoAsignacion(marca: any, rol_codigo: any){
    
    this.listPermisoAsignacion = [];
    this.permisoasignacion$.next({ listPermisoAsignacion: this.listPermisoAsignacion, cargando: true });
    
    this.http.get(`${this.baseUrl}api/gestionusuario/getAllPermisoRol/${marca}/${rol_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.permisoasignacion$.next({ listPermisoAsignacion: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listado de Permisos');
        this.permisoasignacion$.next({ listPermisoAsignacion: [], cargando: false });
      }
    });    

  }


  //ASIGNACION DE MENUS PARA ROLES

  asignacionRolMenu(rolmenu: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/asignar_rol_menu/${marca}`, rolmenu, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }

  //ASIGNACION DE PERMISOS PARA ROLES

  asignacionRolPermiso(rolpermiso: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/asignar_rol_permiso/${marca}`, rolpermiso, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.auth.token,
      }),
    });
  }


  //OBTENER LISTADO DE EMPRESAS

  getListAllEmpresa$(): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listEmpresa)
      this.getEmpresas(marca);
    return this.empresa$.asObservable();
  }

  getEmpresas(marca: any){
    
    this.listEmpresa = [];
    this.empresa$.next({ listEmpresa: this.listEmpresa, cargando: true });
    
    this.http.get(`${this.baseUrl}api/gestionusuario/getAllEmpresas/${marca}`,this.httpOptions).subscribe({
      next: (data) => {

        this.empresa$.next({ listEmpresa: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listar Empresas');
        this.empresa$.next({ listEmpresa: [], cargando: false });
      }
    });    

  }





}
