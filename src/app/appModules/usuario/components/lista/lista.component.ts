import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/es';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Observable} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import {FormBuilder,FormControl,FormGroup,ValidationErrors,Validators,} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MenuService } from '../../../menu/services/menu.service'

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
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  listOfColumns: ColumnItem[] = [
    {
      width:'80px',
      name: 'ID',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Cédula',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
   
    {
      width:'80px',
      name: 'Nombre',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      width: '120px',
      name: 'Telefono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width: '80px',
      name: 'Email',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'120px',
      name: 'Gestión de Menús',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];


  buscarUsuario: any
  desde!: Date;
  hasta!: Date;
  mode = 'date';

  listUsuario: any[] = []
  listUsuarioAux: any[] = []

  usuario$!: Observable<any>;
  cargandoUsuario: boolean = false
  subUsuario: any

  modalGestionMenuUsuario: boolean = false
  itemMenu: any

  listMenuAsignacionUsuario: any;
  menuasignacionusuario$!: Observable<any>;
  subAsignacion: any
  cargandoMenuAsignacionUsuario: boolean = false
  isLoadingUpdate: boolean = false

  listAsignado: any[] = [];
  listSinAsignado: any[] = [];

  codigoUsuario: any
  modalUpdateUsuario: boolean = false
  usuarioForm!: FormGroup

  listRol: any[] = [];
  rol$!: Observable<any>;
  cargandoRol: boolean = false
  subRol: any
  seleectListRol: any[] = []

  codigoRol: any
  modalGestionPermisoUsuario: boolean = false
  listPermisoAsignacion: any;
  permisoasignacion$!: Observable<any>;
  cargandoPermisoAsignacion: boolean = false
  subPermisoAsignacion: any

  listAsignadoPermiso: any[] = [];
  listSinAsignadoPermiso: any[] = [];

  itemPermiso: any
  cambiarRol: boolean = false

  modalGestionEmpresa: boolean = false

  listEmpresaAsignacion: any;
  empresaasignacion$!: Observable<any>;
  cargandoEmpresaAsignacion: boolean = false
  subEmpresaAsignacion: any

  listAsignadoEmpresa: any[] = [];
  listSinAsignadoEmpresa: any[] = [];
  itemEmpresa: any





  constructor(private msg: NzMessageService,
    private router: Router,
    private serviceUsuario: UsuarioService,
    private fb: FormBuilder,
    private serviceMenu: MenuService ) {

      this.usuarioForm = this.fb.group({
      
        usr_id: ['', [Validators.required]],
        usr_nombre: ['', [Validators.required]],
        usr_telefono:['', [Validators.required]],
        usr_email:['', [Validators.required]],
        usr_cedula:['', [Validators.required]],
        usr_clave:['', [Validators.required]],
      
      });

  }

  ngOnInit(): void {
    this.getListUsuarios()
   
  }

  inicio(){
    this.router.navigate(['/usuario/lista'])
  }

  submitForm(): void {
    for (const key in this.usuarioForm.controls) {
      this.usuarioForm.controls[key].markAsDirty();
      this.usuarioForm.controls[key].updateValueAndValidity();
    }
  }

  validateForms(): boolean {
    let v = true;
      if(!this.usuarioForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Usuario");
        this.submitForm()
        return false;
      
      }

    return v;
  }


  crearUsuario(){

    this.router.navigateByUrl('usuario/nuevo?tab=crear');


  }

  filtroBuscarUsuario(){
    
    
    if (this.buscarUsuario == '' || this.buscarUsuario == null) {
      this.listUsuario = this.listUsuarioAux
    }else{
      this.listUsuario = this.listUsuarioAux.filter((item: any) => item.usr_cedula.toUpperCase().indexOf(this.buscarUsuario.toUpperCase()) !== -1 || item.usr_nombre.toUpperCase().indexOf(this.buscarUsuario.toUpperCase()) !== -1 || item.usr_email.toUpperCase().indexOf(this.buscarUsuario.toUpperCase()) !== -1 || item.usr_telefono.toUpperCase().indexOf(this.buscarUsuario.toUpperCase()) !== -1 );
    }


  }

  aceptarPermisos(){
    this.modalGestionPermisoUsuario = false
  }

  actualizarFecha(e: any) {
    if (!e) {
      
      let f1 = new Date(this.desde)
      let fecha1 = moment(f1).format('DD/MM/YYYY 00:00:00')
      let f2 = new Date(this.hasta)
      let fecha2 = moment(f2).format('DD/MM/YYYY 23:59:59')
    }
  }

  getListUsuarios(){
    this.usuario$ = this.serviceUsuario.getListAllUsuarios$()
    
    this.subUsuario = this.usuario$.subscribe(p => {
      console.log(p);
      
      this.listUsuario = p.listUsuario
      this.listUsuarioAux = p.listUsuario

      this.cargandoUsuario = p.cargando

      if(this.cargandoUsuario == false){
        this.subUsuario.unsubscribe()
       
      }
    });

  }


  realoadUsuario(){


  }

  openModalMenuUsuario(usuario: any){

    console.log(usuario);
    this.codigoUsuario = usuario.usr_codigo
    this.getListaMenusAsignacion(usuario.usr_codigo)
    this.modalGestionMenuUsuario = true
    
  }

  openModalEditUsuario(usuario: any){

    this.codigoUsuario = usuario.usr_codigo
    this.getListRoles(usuario.rol_codigo)
    this.modalUpdateUsuario = true
    this.usuarioForm.setValue({

      usr_id: usuario.usr_id,
      usr_nombre: usuario.usr_nombre,
      usr_telefono: usuario.usr_telefono,
      usr_email: usuario.usr_email,
      usr_cedula: usuario.usr_cedula,
      usr_clave: usuario.usr_clave,
     
    })

  }

  updateUsuario(){

    

    let usuario = {
      usr_codigo: this.codigoUsuario,
      usr_id: this.usuarioForm.get('usr_id')!.value,
      usr_nombre: this.usuarioForm.get('usr_nombre')!.value,
      usr_telefono: this.usuarioForm.get('usr_telefono')!.value,
      usr_email: this.usuarioForm.get('usr_email')!.value,
      usr_cedula: this.usuarioForm.get('usr_cedula')!.value,
      usr_estado: 1,
      rol_codigo: this.seleectListRol[0].rol_codigo
    }

    
    console.log(usuario);
    this.isLoadingUpdate = true

    this.serviceUsuario.updateUsuario(usuario).subscribe({
      next: (data) => {
        
        console.log('respuesta---');
        console.log(data);
        if(data){
          this.usuarioForm.reset()
          this.seleectListRol = []
          this.modalUpdateUsuario = false
          this.msg.success('Usuario Actualizado')
          this.isLoadingUpdate = false
          this.getListUsuarios()
        }else{
          this.msg.warning('Error al actualizar')
          this.isLoadingUpdate = false
          this.modalUpdateUsuario = false
        }
        
      },
      error: (err) => {
        this.msg.error(`Ha ocurrido un error al Actualizar Usuario, ${err.error.message}`);
        this.isLoadingUpdate = false
      }
    })



  }

  cerraModal(){
    this.modalGestionMenuUsuario = false
  }

  getListaMenusAsignacion(usr_codigo: any){

    this.menuasignacionusuario$ = this.serviceUsuario.getListAllMenuAsignacionUsuario$(usr_codigo)
      
    this.subAsignacion = this.menuasignacionusuario$.subscribe(p => {
      console.log(p);
      
      this.listMenuAsignacionUsuario = p.listMenuAsignacionUsuario

      this.cargandoMenuAsignacionUsuario = p.cargando

      if(this.cargandoMenuAsignacionUsuario == false){


        
        this.listAsignado = this.listMenuAsignacionUsuario.misMenus
        this.listSinAsignado = this.listMenuAsignacionUsuario.menusSinPadres

        this.subAsignacion.unsubscribe()
       
      }
    });
    
  }


  dropUsuario(event: CdkDragDrop<string[]>, tipoAsignar: any) {

    if (event.previousContainer === event.container) {     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const prev_idx = event.previousIndex;    
      this.itemMenu = event.previousContainer.data[prev_idx];

      
      

      if(tipoAsignar == 'asignado'){

        let usuariomenu = {

          usm_usr_codigo: this.codigoUsuario,
          usm_men_codigo: this.itemMenu.men_codigo,
          usm_marca: this.itemMenu.men_marca,
          usm_estado: this.itemMenu.men_estado,

        }
      
      
        console.log(usuariomenu);

        this.serviceUsuario.asignacionUsuarioMenu(usuariomenu).subscribe({
          next: (data) => {
            
            console.log('respuesta---');
            console.log(data);
            
            if(data){
              this.msg.info('Menú Usuario Agregado')
              this.serviceMenu.updateMenuPrincipal.next(true)
            }
          },
          error: (err) => {
            this.msg.error(`Ha ocurrido un error al Asignar Menu para Usuario, ${err.error.message}`);
          }
        })
      }

      if(tipoAsignar == 'asignar'){

        let usuariomenu = {

          usm_usr_codigo: this.codigoUsuario,
          usm_men_codigo: this.itemMenu.men_codigo,
          usm_marca: this.itemMenu.men_marca,
          usm_estado: 0,

        }
      
      
        console.log(usuariomenu);

        this.serviceUsuario.asignacionUsuarioMenu(usuariomenu).subscribe({
          next: (data) => {
            
            console.log('respuesta---');
            console.log(data);
            
            if(data){
              this.msg.info('Menú Usuario Desactivado')
              this.serviceMenu.updateMenuPrincipal.next(true)
            }
          },
          error: (err) => {
            this.msg.error(`Ha ocurrido un error al Desactivar Menu para Usuario, ${err.error.message}`);
          }
        })


      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );


    }

  }


  getListRoles(rol_codigo: any){
    this.rol$ = this.serviceMenu.getListAllRol$()
    
    this.subRol = this.rol$.subscribe(p => {
      console.log(p);
      
      this.listRol = p.listRol

      this.cargandoRol = p.cargando

      if(this.cargandoRol == false){

        for (var i = 0; i < this.listRol.length; i++) {
        
          if(this.listRol[i].rol_codigo == rol_codigo){
            
            this.listRol[i].rol_verificacion_check = true;
            this.seleectListRol = [...this.seleectListRol, this.listRol[i]]
           
          }else{
            this.listRol[i].rol_verificacion_check = false;
            
          }
          
        }
        this.subRol.unsubscribe()
       
      }
    });

  }


 

  saveSelectRolCheckList(rol: any){

    this.seleectListRol = []

    this.listRol.forEach((item: any, index: any)=>{
 
      if(item.rol_verificacion_check == rol.rol_verificacion_check && item.rol_codigo == rol.rol_codigo){
       
        item.rol_verificacion_check = true
        this.seleectListRol = [...this.seleectListRol, item]
       
      }else{
       
        item.rol_verificacion_check = false
       
      }
    })
    

  }

  getListaPermisosAsignacion(usr_codigo: any){

    this.permisoasignacion$ = this.serviceUsuario.getListAllPermisoAsignacionUsuario$(usr_codigo)
      
    this.subPermisoAsignacion = this.permisoasignacion$.subscribe(p => {
      console.log(p);
      
      this.listPermisoAsignacion = p.listPermisoAsignacion

      this.cargandoPermisoAsignacion = p.cargando

      if(this.cargandoPermisoAsignacion == false){


        
        this.listAsignadoPermiso = this.listPermisoAsignacion.misPermisos
        this.listSinAsignadoPermiso = this.listPermisoAsignacion.noPermisosAsigandos

        this.subPermisoAsignacion.unsubscribe()
       
      }
    });
    
  }


  openModalGestionPermisos(usuario: any){

    this.modalGestionPermisoUsuario = true
    this.getListaPermisosAsignacion(usuario.usr_codigo)
    this.codigoUsuario = usuario.usr_codigo


  }

  dropPermiso(event: CdkDragDrop<string[]>, tipoAsignar: any) {

    if (event.previousContainer === event.container) {     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const prev_idx = event.previousIndex;    
      this.itemPermiso = event.previousContainer.data[prev_idx];

      if(tipoAsignar == 'asignado'){

        let usuariopermiso = {

          usp_usr_codigo: this.codigoUsuario,
          usp_per_codigo: this.itemPermiso.per_codigo,
          usp_marca: this.itemPermiso.per_marca,
          usp_estado: this.itemPermiso.per_estado
        }
      
      
        console.log(usuariopermiso);

        this.serviceUsuario.asignacionUsuarioPermiso(usuariopermiso).subscribe({
          next: (data) => {
            
            console.log('respuesta---');
            console.log(data);
            
            if(data){
              this.msg.info('Usuario Permiso Agregado')
            }
          },
          error: (err) => {
            this.msg.error(`Ha ocurrido un error al Asignar Permiso para Usuario, ${err.error.message}`);
          }
        })
      }

      if(tipoAsignar == 'asignar'){

        let usuariopermiso = {

          usp_usr_codigo: this.codigoUsuario,
          usp_per_codigo: this.itemPermiso.per_codigo,
          usp_marca: this.itemPermiso.per_marca,
          usp_estado: 0

        }
      
      
        console.log(usuariopermiso);

        this.serviceUsuario.asignacionUsuarioPermiso(usuariopermiso).subscribe({
          next: (data) => {
            
            console.log('respuesta---');
            console.log(data);
            
            if(data){
              this.msg.info('Usuario Permiso Desactivado')
            }
          },
          error: (err) => {
            this.msg.error(`Ha ocurrido un error al Desactivar Permiso para Usuario, ${err.error.message}`);
          }
        })


      }


      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );


    }

  }

  openModalGestionEmpresa(usuario: any){

    this.modalGestionEmpresa = true
    this.getListaEmpresaAsignacion(usuario.usr_codigo)
    this.codigoUsuario = usuario.usr_codigo

  }


  getListaEmpresaAsignacion(usr_codigo: any){

    this.empresaasignacion$ = this.serviceUsuario.getListAllEmpresaAsignacionUsuario$(usr_codigo)
      
    this.subEmpresaAsignacion = this.empresaasignacion$.subscribe(p => {
      console.log(p);
      
      this.listEmpresaAsignacion = p.listEmpresaAsignacion

      this.cargandoEmpresaAsignacion = p.cargando

      if(this.cargandoEmpresaAsignacion == false){

        this.listAsignadoEmpresa = this.listEmpresaAsignacion.misEmpresas
        this.listSinAsignadoEmpresa = this.listEmpresaAsignacion.noEmpresasAsigandos

        this.subEmpresaAsignacion.unsubscribe()
       
      }
    });
    
  }


  cerraModalEmpresa(){
    this.modalGestionEmpresa = false
  }


  dropEmpresa(event: CdkDragDrop<string[]>, tipoAsignar: any) {

    if (event.previousContainer === event.container) {     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const prev_idx = event.previousIndex;    
      this.itemEmpresa = event.previousContainer.data[prev_idx];

      if(tipoAsignar == 'asignado'){

        let usuarioempresa = {

          emu_emp_codigo: this.itemEmpresa.emp_codigo,
          emu_usr_codigo: this.codigoUsuario,
          emu_marca: this.itemEmpresa.emp_marca,
          emu_estado: this.itemEmpresa.emp_estado
        }
      
      
        console.log(usuarioempresa);

        this.serviceUsuario.asignacionUsuarioEmpresa(usuarioempresa).subscribe({
          next: (data) => {
            
            console.log('respuesta---');
            console.log(data);
            
            if(data){
              this.msg.info('Usuario Empresa Agregado')
              this.serviceMenu.updateMenuPrincipal.next(true);
            }
          },
          error: (err) => {
            this.msg.error(`Ha ocurrido un error al Asignar Empresa para Usuario, ${err.error.message}`);
          }
        })
      }

      if(tipoAsignar == 'asignar'){

        let usuarioempresa = {

          emu_emp_codigo: this.itemEmpresa.emp_codigo,
          emu_usr_codigo: this.codigoUsuario,
          emu_marca: this.itemEmpresa.emp_marca,
          emu_estado: 0

        }
      
      
        console.log(usuarioempresa);

        this.serviceUsuario.asignacionUsuarioEmpresa(usuarioempresa).subscribe({
          next: (data) => {
            
            console.log('respuesta---');
            console.log(data);
            
            if(data){
              this.msg.info('Usuario Empresa Desactivado')
              this.serviceMenu.updateMenuPrincipal.next(true);
            }
          },
          error: (err) => {
            this.msg.error(`Ha ocurrido un error al Desactivar Empresa para Usuario, ${err.error.message}`);
          }
        })


      }


      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );


    }

  }






}
