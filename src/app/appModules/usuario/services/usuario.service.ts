import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GlobalserviceService } from '../../../core/globalservice.service'
import { AuthService } from '../../../core/auth.service'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = '';

  private listUsuario:any[] =[] ;
  private usuario$! : BehaviorSubject<any>;

  private listMenuAsignacionUsuario: any[] = [];
  private menuasignacionusuario$!: BehaviorSubject<any>;


  private listPermisoAsignacion: any[] = [];
  private permisoasignacion$!: BehaviorSubject<any>;

  private listEmpresaAsignacion: any[] = [];
  private empresaasignacion$!: BehaviorSubject<any>;


  constructor(private notification: NzNotificationService,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService,
    private serviceAuth: AuthService) {

      this.baseUrl = baseUrl;
      this.usuario$ = new BehaviorSubject({listUsuario:[],cargando:false});
      this.menuasignacionusuario$ = new BehaviorSubject({listMenuAsignacionUsuario:[],cargando:false});
      this.permisoasignacion$ = new BehaviorSubject({listPermisoAsignacion:[],cargando:false});
      this.empresaasignacion$ = new BehaviorSubject({listEmpresaAsignacion:[],cargando:false});

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

  // CREAR USUARIO

  createUsuario(usuario: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/create_usuario/${marca}`, usuario, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+this.serviceAuth.token
      }),
    });
  }

    // ACTUALIZAR USUARIO

    updateUsuario(usuario: any): Observable<any> {
      let marca = this.serviceGlobal.getCodigoMarca()
      return this.http.post(`${this.baseUrl}api/gestionusuario/update_usuario/${marca}`, usuario, {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+this.serviceAuth.token
        }),
      });
    }
  


  //OBTENER LISTADO DE USUARIOS

  getListAllUsuarios$(): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listUsuario)
      this.getUsuarios(marca);
    return this.usuario$.asObservable();
  }

  getUsuarios(marca: any){
    
    this.listUsuario = [];
    this.usuario$.next({ listUsuario: this.listUsuario, cargando: true });
    
    this.http.get(`${this.baseUrl}api/gestionusuario/getAllUsuarios/${marca}`,this.httpOptions).subscribe({
      next: (data) => {

        this.usuario$.next({ listUsuario: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listar los Usuarios');
        this.usuario$.next({ listUsuario: [], cargando: false });
      }
    });    

  }


    //LISTADO DE MENUS ASIGNADOS Y POR ASIGNAR PARA USUARIO

    getListAllMenuAsignacionUsuario$(usr_codigo: any): Observable<any> {
      let marca = this.serviceGlobal.getCodigoMarca()
      if(this.listMenuAsignacionUsuario)
        this.getMenusAsignacionUsuario(marca, usr_codigo);
      return this.menuasignacionusuario$.asObservable();
    }
  
    getMenusAsignacionUsuario(marca: any, usr_codigo: any){
      
      this.listMenuAsignacionUsuario = [];
      this.menuasignacionusuario$.next({ listMenuAsignacionUsuario: this.listMenuAsignacionUsuario, cargando: true });
      
      this.http.get(`${this.baseUrl}api/gestionusuario/getAllMenuUsuario/${marca}/${usr_codigo}`,this.httpOptions).subscribe({
        next: (data) => {
  
          this.menuasignacionusuario$.next({ listMenuAsignacionUsuario: data, cargando: false});
        },
        error: (err) => {
          this.createNotification('error', 'Error', 'ha ocurrido un error al obtener listado de asignacion menu para Usuario');
          this.menuasignacionusuario$.next({ listMenuAsignacionUsuario: [], cargando: false });
        }
      });    
  
    }

  //ASIGNACION DE MENUS PARA USUARIOS

  asignacionUsuarioMenu(usuariomenu: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/asignar_usuario_menu/${marca}`, usuariomenu, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+this.serviceAuth.token
      }),
    });
  }

  //LISTADO DE PERMISOS PARA ASIGNACION A USUARIOS
  
  
  getListAllPermisoAsignacionUsuario$(usr_codigo: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    if(this.listPermisoAsignacion)
      this.getPermisoAsignacion(marca, usr_codigo);
    return this.permisoasignacion$.asObservable();
  }

  getPermisoAsignacion(marca: any, usr_codigo: any){
    
    this.listPermisoAsignacion = [];
    this.permisoasignacion$.next({ listPermisoAsignacion: this.listPermisoAsignacion, cargando: true });
    
    this.http.get(`${this.baseUrl}api/gestionusuario/getAllPermisoUsario/${marca}/${usr_codigo}`,this.httpOptions).subscribe({
      next: (data) => {

        this.permisoasignacion$.next({ listPermisoAsignacion: data, cargando: false});
      },
      error: (err) => {
        this.createNotification('error', 'Error', 'ha ocurrido un error al listar los Permisos para Usuario');
        this.permisoasignacion$.next({ listPermisoAsignacion: [], cargando: false });
      }
    });    

  }


  
  //ASIGNACION DE PERMISOS PARA USUARIOS

  asignacionUsuarioPermiso(usuariopermiso: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/asignar_usuario_permiso/${marca}`, usuariopermiso, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+this.serviceAuth.token
      }),
    });
  }



    //LISTADO DE EMPRESAS PARA ASIGNACION A USUARIOS
  
  
    getListAllEmpresaAsignacionUsuario$(usr_codigo: any): Observable<any> {
      let marca = this.serviceGlobal.getCodigoMarca()
      if(this.listEmpresaAsignacion)
        this.getEmpresaAsignacion(marca, usr_codigo);
      return this.empresaasignacion$.asObservable();
    }
  
    getEmpresaAsignacion(marca: any, usr_codigo: any){
      
      this.listEmpresaAsignacion = [];
      this.empresaasignacion$.next({ listEmpresaAsignacion: this.listEmpresaAsignacion, cargando: true });
      
      this.http.get(`${this.baseUrl}api/gestionusuario/getAllEmpresaUsuario/${marca}/${usr_codigo}`,this.httpOptions).subscribe({
        next: (data) => {
  
          this.empresaasignacion$.next({ listEmpresaAsignacion: data, cargando: false});
        },
        error: (err) => {
          this.createNotification('error', 'Error', 'ha ocurrido un error al listar Empresas para Usuario');
          this.empresaasignacion$.next({ listEmpresaAsignacion: [], cargando: false });
        }
      });    
  
    }

  //ASIGNACION DE EMPRESAS PARA USUARIOS

  asignacionUsuarioEmpresa(usuarioempresa: any): Observable<any> {
    let marca = this.serviceGlobal.getCodigoMarca()
    return this.http.post(`${this.baseUrl}api/gestionusuario/asignar_empresa_usuario/${marca}`, usuarioempresa, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+this.serviceAuth.token
      }),
    });
  }

  


}
