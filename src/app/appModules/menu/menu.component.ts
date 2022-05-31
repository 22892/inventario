import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {FormBuilder,FormControl,FormGroup,ValidationErrors,Validators,} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { MenuService } from '../menu/services/menu.service'
import { AuthService } from '../../core/auth.service'
import { ObservacionService } from '../observacion/services/observacion.service'

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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  listOfColumns: ColumnItem[] = [
    {
      width:'80px',
      name: 'Titulo',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'70px',
      name: 'Descripción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
   
    {
      width:'80px',
      name: 'Icono',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      width: '120px',
      name: 'Tipo Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width: '80px',
      name: 'Path',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'120px',
      name: 'Gestiónde Menús',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];


  listOfColumnsRol: ColumnItem[] = [
    {
      width:'80px',
      name: 'Descripción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'120px',
      name: 'Gestiónde Roles',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];


  listOfColumnsEmpresa: ColumnItem[] = [
    {
      width:'70px',
      name: 'Logo',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Ruc',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'80px',
      name: 'Nombre',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'80px',
      name: 'Dirección',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      width:'80px',
      name: 'Télefono',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];


  listOfColumnsGrupo: ColumnItem[] = [
    {
      width:'80px',
      name: 'Nombre',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Nombre Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Tipo Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'120px',
      name: 'Operaciones',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];

  listOfColumnsTamano: ColumnItem[] = [
    {
      width:'80px',
      name: 'Nombre',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Nombre Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Tipo Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'120px',
      name: 'Operaciones',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];

  listOfColumnsDano: ColumnItem[] = [
    {
      width:'80px',
      name: 'Nombre',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Nombre Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'80px',
      name: 'Tipo Icono',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'120px',
      name: 'Operaciones',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];


  tabs = [
    {
      name: 'Gestión Menú ',
      icon: 'menu'
    },
    {
      name: 'Asignaciones',
      icon: 'user-add'
    },
    {
      name: 'Gestión Revisión',
      icon: 'check-circle'
    }
  ];



  radioValue = '1';
  index: number = 0;
  menuForm!: FormGroup;
  rolForm!: FormGroup;
  empresaForm!: FormGroup;
  parteForm!: FormGroup;
  grupoForm!: FormGroup;
  danoForm!: FormGroup;

  tipoPlataforma: number = 1



  listMenuHijo: any[] = [{men_titulo: 'Padre6', men_descripcion:'Descripcion 1', men_path:'/padre', men_color_icon:'#12fged'},
  {men_titulo: 'Padre7', men_descripcion:'Descripcion 2', men_path:'/padre2', men_color_icon:'#12fged'}];

  listTipoMenu: any[] = [{tim_codigo: 0, tim_nombre: 'Menú Principal'}, {tim_codigo: 1, tim_nombre: 'Submenus'}]
  selectTipoMenu: any

  cargandoMenuPadre: boolean = false
  modalGestionMenu: boolean = false
  modalGestionRol: boolean = false
  modalGestionPermiso: boolean = false
  itemMenu: any
  itemPermiso: any


  listMenuPadre: any[] = [];
  menupadre$!: Observable<any>;
  sub: any

  modalUpdateMenu: boolean = false
  codigoMenu: any


  listMenuAsignacion: any;
  menuasignacion$!: Observable<any>;
  subAsignacion: any
  cargandoMenuAsignacion: boolean = false
  isLoadingUpdate: boolean = false

  listAsignado: any[] = [];
  listSinAsignado: any[] = [];

  modalUpdateRol: boolean = false
  isLoadingUpdateRol: boolean = false
  listRol: any[] = [];
  rol$!: Observable<any>;
  cargandoRol: boolean = false
  subRol: any

  listRolAsignacion: any
  rolasignacion$!: Observable<any>;
  subRolAsignacion: any
  cargandoRolAsignacion: any
  codigoRol: any

  listAsignadoRol: any[] = [];
  listSinAsignadoRol: any[] = [];

  listPermisoAsignacion: any;
  permisoasignacion$!: Observable<any>;
  cargandoPermisoAsignacion: boolean = false
  subPermisoAsignacion: any

  listAsignadoPermiso: any[] = [];
  listSinAsignadoPermiso: any[] = [];

  isLoadingCrearMenu: boolean = false
  isLoadingCrearRol: boolean = false
  isLoadingCrearParte: boolean = false


  listEmpresa: any[] = [];
  empresa$!: Observable<any>;
  cargandoEmpresa: boolean = false
  subEmpresa: any

  radioTipoMenu = 'A';
  tipoMenuList: any = 0

  listGrupos: any[] = [];
  grupos$!: Observable<any>;
  subgrupo: any
  cargandoGrupos: boolean = false
  modalCrudParte: boolean = false
  tipoCrudParte: number = 0
  titleCrudParte: string = "Crear Parte"
  isLoadingCreateUpdateParte: boolean = false

  listTamano: any[] = [];
  tamano$!: Observable<any>;
  subtamano: any
  cargandoTamano: boolean = false

  listDano: any[] = [];
  dano$!: Observable<any>;
  subdano: any
  cargandoDano: boolean = false


  parte: any
  grupo: any
  isLoadingCrearGrupo: boolean = false
  modalCrudGrupo: boolean = false
  titleCrudGrupo: string = "CREAR GRUPO"

  modalCrudDano: boolean = false
  isLoadingCrudDano: boolean = false
  titleCrudDano: string = "CREAR DAÑO"

  constructor( private fb: FormBuilder,
    @Inject('BASE_URL') baseUrl: string,
    private cdRef:ChangeDetectorRef,
    private msg: NzMessageService,
    private serviceMenu: MenuService,
    private serviceAuth: AuthService,
    private router: Router,
    private serviceObservacion: ObservacionService
    ) {

      this.danoForm = this.fb.group({
       
        dan_nombre: [null, [Validators.required]],
        dan_type_ico: [null, [Validators.required]],
        dan_nombre_ico: [null, [Validators.required]],
       
      });

      this.grupoForm = this.fb.group({
       
        grp_nombre: [null, [Validators.required]],
        grp_tipo_ico: [null, [Validators.required]],
        grp_nombre_ico: [null, [Validators.required]],
       
      });

      this.parteForm = this.fb.group({
       
        par_nombre: [null, [Validators.required]],
        par_type_ico: [null, [Validators.required]],
        par_nombre_ico: [null, [Validators.required]],
       
      });

      
      this.rolForm = this.fb.group({
        rol_descripcion: [null, [Validators.required]],
       
      });

      this.menuForm = this.fb.group({
        men_titulo: [null, [Validators.required]],
        men_descripcion: [null, [Validators.required]],
        men_path: [null, [Validators.required]],
        men_color_icon: [null, []],
        men_color_titulo: [null, []],
        men_color_descripcion: [null, []],
        men_icono: [null, [Validators.required]],
        men_tipo_icono: [null, [Validators.required]],
        men_tipo_menu: [null, [Validators.required]],
      });

      this.empresaForm = this.fb.group({
        emp_id: [null, [Validators.required]],
        emp_razon_social: [null, [Validators.required]],
        emp_nombre_comercial: [null, [Validators.required]],
        emp_direccion: [null, [Validators.required]],
        emp_telefono: [null, [Validators.required]],
        emp_telefono1: [null, [Validators.required]],
        emp_telefono2: [null, [Validators.required]],
        emp_mail_empresa: [null, [Validators.required]],
        emp_representante: [null, [Validators.required]],
        emp_servicio: [null, [Validators.required]],
        emp_ruc: [null, [Validators.required]],
        emp_logo: [null, [Validators.required]],
        emp_pagina_web: [null, [Validators.required]],
        emp_facebook: [null, [Validators.required]],
        emp_link_facebook: [null, [Validators.required]],
        emp_url_home_mail: [null, [Validators.required]],
        emp_url_crm: [null, [Validators.required]],
        emp_subdominio: [null, [Validators.required]],
        emp_subfijo: [null, [Validators.required]],
        emp_distribucion: [null, [Validators.required]],
        emp_link_twitter: [null, [Validators.required]],
        emp_link_linkedin: [null, [Validators.required]],
        emp_link_instagram: [null, [Validators.required]],
        emp_orden_empresa: [null, [Validators.required]],
        emp_subasta_estado: [null, [Validators.required]],
      
       
      });

  }

  ngOnInit(): void {

    if (this.serviceAuth.token == undefined || this.serviceAuth.token == '') {
      this.router.navigate(['/']);
    } else{

      
      this.getListMenuPrincipal(0)
      this.getListRoles()
      this.getListEmpresas()
      this.getListGrupos()
      this.getListDano()
      this.getListTamano()
  
    }
 
  }


  validateFormsDano(): boolean {
    let v = true;
      if(!this.danoForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear parte de Daño");
        this.submitFormDano()
        return false;
      }
    return v;
  }


  submitFormDano(): void {
    for (const key in this.danoForm.controls) {
      this.danoForm.controls[key].markAsDirty();
      this.danoForm.controls[key].updateValueAndValidity();
    }
  }


  validateFormsGrupo(): boolean {
    let v = true;
      if(!this.grupoForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Grupo");
        this.submitFormGrupo()
        return false;
      }
    return v;
  }


  submitFormGrupo(): void {
    for (const key in this.grupoForm.controls) {
      this.grupoForm.controls[key].markAsDirty();
      this.grupoForm.controls[key].updateValueAndValidity();
    }
  }


  validateFormsParte(): boolean {
    let v = true;
      if(!this.menuForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Parte");
        this.submitFormParte()
        return false;
      }
    return v;
  }


  submitFormParte(): void {
    for (const key in this.parteForm.controls) {
      this.parteForm.controls[key].markAsDirty();
      this.parteForm.controls[key].updateValueAndValidity();
    }
  }

  submitForm(): void {
    for (const key in this.menuForm.controls) {
      this.menuForm.controls[key].markAsDirty();
      this.menuForm.controls[key].updateValueAndValidity();
    }
  }

  validateForms(): boolean {
    let v = true;
      if(!this.menuForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Menú");
        this.submitForm()
        //this.cargandoMenuPadre = false
        return false;
      
      }

    return v;
  }

  submitFormRol(): void {
    for (const key in this.rolForm.controls) {
      this.rolForm.controls[key].markAsDirty();
      this.rolForm.controls[key].updateValueAndValidity();
    }
  }

  validateFormsRol(): boolean {
    let v = true;
      if(!this.rolForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Roles");
        this.submitFormRol()
        return false;
      
      }

    return v;
  }


  submitFormEmpresa(): void {
    for (const key in this.empresaForm.controls) {
      this.empresaForm.controls[key].markAsDirty();
      this.empresaForm.controls[key].updateValueAndValidity();
    }
  }

  validateFormsEmpresa(): boolean {
    let v = true;
      if(!this.empresaForm.valid){
        this.msg.warning("Ingrese todos los datos requeridos para Crear Empresa");
        this.submitFormEmpresa()
        return false;
      }
    return v;
  }

  openModalCrudParte(parte: any, grupo: any){

    this.modalCrudParte = true
    this.parte = parte
    this.grupo = grupo
    this.titleCrudParte = 'Editar Parte'
    console.log(this.parte);
    console.log(this.grupo);

    this.parteForm.setValue({
      par_nombre: this.parte.par_nombre,
      par_type_ico: this.parte.par_type_ico,
      par_nombre_ico: this.parte.par_nombre_ico,
     
    })
  }


  createUpdateDano(){

  }

  openModalCrudDano(dano: any, operacion: number){


    if(operacion == 1){
      this.modalCrudDano = true
      this.titleCrudDano = 'EDITAR DAÑO'
      this.danoForm.setValue({
        dan_nombre: dano.dan_nombre,
        dan_type_ico: dano.dan_type_ico,
        dan_nombre_ico: dano.dan_nombre_ico,
       
      })
    }

    if(operacion == 2){
      this.modalCrudDano = true
      this.titleCrudDano = 'CREAR DAÑO'
    }

  }

  openModalCrudTamano(tamano: any){

  }

  openModalcreateGrupo(){
    this.modalCrudGrupo = true
  }

  createGrupo(){

  }

  crearParte(){

  }

  createUpdateParte(){


    const valida = this.validateFormsParte()

    if(valida){


      let parte = {
        par_codigo: 1,
        par_marca: 100,
        par_id: '',
        par_nombre: '',
        par_grp_codigo: 1,
        par_estado: 1,
        par_type_ico: '',
        par_nombre_ico: ''
      }

      this.isLoadingCreateUpdateParte = true

      this.serviceObservacion.createParte(parte).subscribe(
        data => {
          
          console.log('parteeee');
          console.log(data);
          
      
      },
      err => {
        this.msg.error(`Ha ocurrido un error al Actualizar Parte, ${err.error.message}`);
        this.isLoadingCreateUpdateParte = false

      })
    }



  }


  getListDano(){
    this.dano$ = this.serviceObservacion.getListAllDano$()
    
    this.subdano = this.dano$.subscribe(p => {
      console.log(p);
      
      this.listDano = p.listDano
      this.cargandoDano = p.cargando

      if(this.cargandoDano == false){
        this.subdano.unsubscribe()
      }
    });

  }

  getListTamano(){
    this.tamano$ = this.serviceObservacion.getListAllTamano$()
    
    this.subtamano = this.tamano$.subscribe(p => {
      console.log(p);
      
      this.listTamano = p.listTamano
      this.cargandoTamano = p.cargando

      if(this.cargandoTamano == false){
        this.subtamano.unsubscribe()
      }
    });

  }

  getListGrupos(){
    this.grupos$ = this.serviceObservacion.getListAllGrupos$()
    
    this.subgrupo = this.grupos$.subscribe(p => {
      console.log(p);
      
      this.listGrupos = p.listGrupos
      this.cargandoGrupos = p.cargando

      if(this.cargandoGrupos == false){
        this.listGrupos.forEach((item: any)=>{
          item.grp_nombre_ico = 'car'
        })
        this.subgrupo.unsubscribe()
      }
    });

  }




  getListMenuByType(tipoMenu: number){

    this.tipoMenuList = tipoMenu
    this.getListMenuPrincipal(tipoMenu)


  }

  crearMenus(){

    //console.log(this.selectTipoMenu);
    //console.log(this.tipoPlataforma);
    
    
    // 1 es tipo Web  ----- 0 es tipo movil
    if(this.tipoPlataforma == 1){

      const valida = this.validateForms()

      if(valida){

        let menuWeb: any
        this.isLoadingCrearMenu = true

        if(this.selectTipoMenu.tim_codigo == 0){
          
          menuWeb = {
            men_padre: 1,
            men_titulo: this.menuForm.get('men_titulo')!.value,
            men_descripcion: this.menuForm.get('men_descripcion')!.value,
            men_path: this.menuForm.get('men_path')!.value,
            men_icono: this.menuForm.get('men_icono')!.value,
            men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
            men_tipo_menu: Number(this.tipoPlataforma),
            men_estado: 1
  
          }
  
        }else{

          menuWeb = {
            men_padre: 0,
            men_titulo: this.menuForm.get('men_titulo')!.value,
            men_descripcion: this.menuForm.get('men_descripcion')!.value,
            men_path: this.menuForm.get('men_path')!.value,
            men_icono: this.menuForm.get('men_icono')!.value,
            men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
            men_tipo_menu: Number(this.tipoPlataforma),
            men_estado: 1
  
          }

        }


        //console.log(menuWeb);   

        this.serviceMenu.createMenus(menuWeb).subscribe(
          data => {
            
            //console.log('respuesta---');
            //console.log(data);
            
            if(data){
              if(this.selectTipoMenu.tim_codigo == 0){
                this.msg.info('Menú Principal Creado')
                this.menuForm.reset()
                this.getListMenuPrincipal(this.tipoMenuList)
                this.isLoadingCrearMenu = false
                this.serviceMenu.updateMenuPrincipal.next(true);

              }else{
                this.msg.info('Submenu Creado')
                this.menuForm.reset()
                this.getListMenuPrincipal(this.tipoMenuList)
                this.isLoadingCrearMenu = false
                this.serviceMenu.updateMenuPrincipal.next(true);

              }
              
            }else{
              this.msg.error('Error', data)
              this.isLoadingCrearMenu = false

            }
           
         
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Crear Menu Principal, ${err.error.message}`);
          this.isLoadingCrearMenu = false

        })

        /*this.serviceMenu.createMenus(1,menuPadre).subscribe({complete: ()=>{

        }, error: () =>{

        }, next: ()=>{

        }})*/

      }

    }else{

      

      const valida = this.validateForms()

        if(valida){

          let menuMovil: any
          this.isLoadingCrearMenu = true

          if(this.selectTipoMenu.tim_codigo == 0){

            menuMovil = {
              men_padre: 1,
              men_titulo: this.menuForm.get('men_titulo')!.value,
              men_descripcion: this.menuForm.get('men_descripcion')!.value,
              men_path: this.menuForm.get('men_path')!.value,
              men_icono: this.menuForm.get('men_icono')!.value,
              men_color_icon: this.menuForm.get('men_color_icon')!.value,
              men_color_titulo: this.menuForm.get('men_color_titulo')!.value,
              men_color_descripcion: this.menuForm.get('men_color_descripcion')!.value,
              men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
              men_tipo_menu: this.tipoPlataforma,
              men_estado: 1
      
            }
  


          }else{

            menuMovil = {
              men_padre: 0,
              men_titulo: this.menuForm.get('men_titulo')!.value,
              men_descripcion: this.menuForm.get('men_descripcion')!.value,
              men_path: this.menuForm.get('men_path')!.value,
              men_icono: this.menuForm.get('men_icono')!.value,
              men_color_icon: this.menuForm.get('men_color_icon')!.value,
              men_color_titulo: this.menuForm.get('men_color_titulo')!.value,
              men_color_descripcion: this.menuForm.get('men_color_descripcion')!.value,
              men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
              men_tipo_menu: this.tipoPlataforma,
              men_estado: 1
      
            }


          }

          this.serviceMenu.createMenus(menuMovil).subscribe(
            data => {
              
              //console.log('respuesta---');
              //console.log(data);
              
              if(data){
                if(this.selectTipoMenu.tim_codigo == 0){
                  this.msg.info('Menú Movil Principal Creado')
                  this.menuForm.reset()
                  this.getListMenuPrincipal(this.tipoMenuList)
                  this.isLoadingCrearMenu = false
                  this.serviceMenu.updateMenuPrincipal.next(true);

                }else{
                  this.msg.info('Submenu Movil Creado')
                  this.menuForm.reset()
                  this.getListMenuPrincipal(this.tipoMenuList)
                  this.isLoadingCrearMenu = false
                  this.serviceMenu.updateMenuPrincipal.next(true);

                }
                
              }else{
                this.msg.error('Error', data)
                this.isLoadingCrearMenu = false

              }
             
           
          },
          err => {
            this.msg.error(`Ha ocurrido un error al Crear Menu Principal Movil, ${err.error.message}`);
            this.isLoadingCrearMenu = false

          })
  

        }
    }

  }

  tipoMenuPlataforma(tipo: number){
    
    if(tipo == 1){
      this.tipoPlataforma = 1
      this.menuForm.reset();
    }else{
      this.tipoPlataforma = 2
      this.menuForm.reset();
    }

    
  }

  isNotSelected(value: any): boolean {
    return this.listMenuPadre.indexOf(value) === -1;
  }


  drop(event: CdkDragDrop<string[]>, tipoAsignar: any) {
    
   
    if (event.previousContainer === event.container) {     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const prev_idx = event.previousIndex;    
      this.itemMenu = event.previousContainer.data[prev_idx];


      if(tipoAsignar == 'asignado'){

        let objetMenu = {

          men_codigo: this.itemMenu.men_codigo,
          men_titulo: this.itemMenu.men_titulo,
          men_descripcion: this.itemMenu.men_descripcion,
          men_path: this.itemMenu.men_path,
          men_icono: this.itemMenu.men_icono,
          men_tipo_icono: this.itemMenu.men_tipo_icono,
          men_tipo_menu: this.itemMenu.men_tipo_menu,
          men_color_icon: this.itemMenu.men_color_icon,
          men_color_titulo: this.itemMenu.men_color_titulo,
          men_color_descripcion: this.itemMenu.men_color_descripcion,
          men_estado: 1,
          men_marca: this.itemMenu.men_marca,
          men_padre: this.codigoMenu,
          men_asignacion: 1

        }
      
      
        //console.log(objetMenu);

        this.serviceMenu.updateMenus(objetMenu).subscribe(
          data => {
            
            //console.log('respuesta---');
            //console.log(data);
            
            if(data){
              
                this.msg.info('Submenu Agregado')
                
               
          }
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Asignar Submenu, ${err.error.message}`);
        })
      }

      if(tipoAsignar == 'asignar'){


        let objetMenu = {

          men_codigo: this.itemMenu.men_codigo,
          men_titulo: this.itemMenu.men_titulo,
          men_descripcion: this.itemMenu.men_descripcion,
          men_path: this.itemMenu.men_path,
          men_icono: this.itemMenu.men_icono,
          men_tipo_icono: this.itemMenu.men_tipo_icono,
          men_tipo_menu: this.itemMenu.men_tipo_menu,
          men_color_icon: this.itemMenu.men_color_icon,
          men_color_titulo: this.itemMenu.men_color_titulo,
          men_color_descripcion: this.itemMenu.men_color_descripcion,
          men_estado: 1,
          men_marca: this.itemMenu.men_marca,
          men_padre: 0,
          men_asignacion: 1

        }
      
      
        //console.log(objetMenu);

        this.serviceMenu.updateMenus(objetMenu).subscribe(
          data => {
            
            
            if(data){
              
                this.msg.info('Submenu Desactivado')
            }
        },
        err => {
          this.msg.error(`Ha ocurrido un error al desactivar Submenu, ${err.error.message}`);
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


  getListaMenusAsignacion(men_padre: any, plataforma: any){

    this.menuasignacion$ = this.serviceMenu.getListAllMenuAsignacion$(men_padre,plataforma)
      
    this.subAsignacion = this.menuasignacion$.subscribe(p => {
      //console.log(p);
      
      this.listMenuAsignacion = p.listMenuAsignacion

      this.cargandoMenuAsignacion = p.cargando

      if(this.cargandoMenuAsignacion == false){


        
        this.listAsignado = this.listMenuAsignacion.misMenus
        this.listSinAsignado = this.listMenuAsignacion.menusSinPadres

        this.subAsignacion.unsubscribe()
       
      }
    });
    
  }



  openModalMenu(menu: any){

    
    this.modalGestionMenu = true
    this.getListaMenusAsignacion(menu.men_codigo, menu.men_tipo_menu)
    this.codigoMenu = menu.men_codigo
  }

  GuardarCambios(){
    this.modalGestionMenu = false
  }


  getListMenuPrincipal(tipoMenu: number){
    this.menupadre$ = this.serviceMenu.getListAllMenuPadre$(tipoMenu)
    
    this.sub = this.menupadre$.subscribe(p => {
      //console.log(p);
      
      this.listMenuPadre = p.listMenuPadre

      this.cargandoMenuPadre = p.cargando

      if(this.cargandoMenuPadre == false){
       
        this.sub.unsubscribe()
       
      }
    });

  }

  openModalEditMenu(item: any){

    if(item.men_tipo_menu == 1){
      this.tipoPlataforma = 1
      this.modalUpdateMenu = true
      this.radioValue='1'
      this.selectTipoMenu = this.listTipoMenu[0]
      this.codigoMenu = item.men_codigo
      this.menuForm.setValue({

       
        men_titulo: item.men_titulo,
        men_descripcion: item.men_descripcion,
        men_path: item.men_path,
        men_icono: item.men_icono,
        men_tipo_icono: item.men_tipo_icono,
        men_tipo_menu: item.men_tipo_menu,
        men_color_icon: '',
        men_color_titulo: '',
        men_color_descripcion: '',
      })

      

    }else{
      this.tipoPlataforma = 2
      this.modalUpdateMenu = true
      this.radioValue='0'
      this.selectTipoMenu = this.listTipoMenu[0]
      this.codigoMenu = item.men_codigo
      this.menuForm.setValue({

        
        men_titulo: item.men_titulo,
        men_descripcion: item.men_color_descripcion,
        men_path: item.men_path,
        men_icono: item.men_icono,
        men_color_icon: item.men_color_icon,
        men_color_titulo: item.men_color_titulo,
        men_color_descripcion: item.men_color_descripcion,
        men_tipo_icono: item.men_tipo_icono,
        men_tipo_menu: item.men_tipo_menu,
      

      })
  
    }



  }

  updateMenus(){

    if(this.tipoPlataforma == 1){

      const valida = this.validateForms()

      if(valida){

        let menuPadre: any

        if(this.selectTipoMenu.tim_codigo == 0){
          
          menuPadre = {

            men_codigo: this.codigoMenu,
            men_padre: this.selectTipoMenu.tim_codigo,
            men_titulo: this.menuForm.get('men_titulo')!.value,
            men_descripcion: this.menuForm.get('men_descripcion')!.value,
            men_path: this.menuForm.get('men_path')!.value,
            men_icono: this.menuForm.get('men_icono')!.value,
            men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
            men_tipo_menu: Number(this.tipoPlataforma),
            men_estado: 1,
            men_asignacion: 0
  
          }
  
        }else{

          menuPadre = {

            men_codigo: this.codigoMenu,
            men_padre: 0,
            men_titulo: this.menuForm.get('men_titulo')!.value,
            men_descripcion: this.menuForm.get('men_descripcion')!.value,
            men_path: this.menuForm.get('men_path')!.value,
            men_icono: this.menuForm.get('men_icono')!.value,
            men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
            men_tipo_menu: Number(this.tipoPlataforma),
            men_estado: 1,
            men_asignacion: 0
  
          }

        }

        this.isLoadingUpdate = true

        //console.log(menuPadre);
        

        this.serviceMenu.updateMenus(menuPadre).subscribe(
          data => {
            
            if(data){
              if(this.selectTipoMenu.tim_codigo == 0){
                this.msg.info('Menú Principal Actualizado')
                this.getListMenuPrincipal(this.tipoMenuList)
                this.modalUpdateMenu = false
                this.isLoadingUpdate = false
                this.menuForm.reset()
                this.serviceMenu.updateMenuPrincipal.next(true);
              }else{
                this.msg.info('Submenu Actualizado')
                this.getListMenuPrincipal(this.tipoMenuList)
                this.modalUpdateMenu = false
                this.isLoadingUpdate = false
                this.menuForm.reset()
                this.serviceMenu.updateMenuPrincipal.next(true);
              }
              
            }else{
              this.msg.error('Error', data)
            }
           
         
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Actualizar Menu Principal, ${err.error.message}`);
        })

      }

    }else{

      const valida = this.validateForms()

        if(valida){


          let menuMovil: any


          if(this.selectTipoMenu.tim_codigo == 0){

            menuMovil = {

              men_codigo: this.codigoMenu,
              men_padre: this.selectTipoMenu.tim_codigo,
              men_titulo: this.menuForm.get('men_titulo')!.value,
              men_descripcion: this.menuForm.get('men_descripcion')!.value,
              men_path: this.menuForm.get('men_path')!.value,
              men_icono: this.menuForm.get('men_icono')!.value,
              men_color_icon: this.menuForm.get('men_color_icon')!.value,
              men_color_titulo: this.menuForm.get('men_color_titulo')!.value,
              men_color_descripcion: this.menuForm.get('men_color_descripcion')!.value,
              men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
              men_tipo_menu: this.tipoPlataforma,
              men_estado: 1,
              men_asignacion: 0
      
            }
  


          }else{

            menuMovil = {

              men_codigo: this.codigoMenu,

              men_padre: 0,
              men_titulo: this.menuForm.get('men_titulo')!.value,
              men_descripcion: this.menuForm.get('men_descripcion')!.value,
              men_path: this.menuForm.get('men_path')!.value,
              men_icono: this.menuForm.get('men_icono')!.value,
              men_color_icon: this.menuForm.get('men_color_icon')!.value,
              men_color_titulo: this.menuForm.get('men_color_titulo')!.value,
              men_color_descripcion: this.menuForm.get('men_color_descripcion')!.value,
              men_tipo_icono: this.menuForm.get('men_tipo_icono')!.value,
              men_tipo_menu: this.tipoPlataforma,
              men_estado: 1,
              men_asignacion: 0
      
            }


          }

          this.isLoadingUpdate = true

          this.serviceMenu.updateMenus(menuMovil).subscribe(
            data => {
                            
              if(data){
                if(this.selectTipoMenu.tim_codigo == 0){
                  this.msg.info('Menú Movil Principal Actualizado')
                  this.menuForm.reset()
                  this.modalUpdateMenu = false
                  this.isLoadingUpdate = false
                  this.getListMenuPrincipal(this.tipoMenuList)
                  this.serviceMenu.updateMenuPrincipal.next(true);

                }else{
                  this.msg.info('Submenu Movil Actualizado')
                  this.menuForm.reset()
                  this.modalUpdateMenu = false
                  this.isLoadingUpdate = false
                  this.getListMenuPrincipal(this.tipoMenuList)
                  this.serviceMenu.updateMenuPrincipal.next(true);

                }
                
              }else{
                this.msg.error('Error', data)
              }
             
           
          },
          err => {
            this.msg.error(`Ha ocurrido un error al Actualizar Menu Principal Movil, ${err.error.message}`);
          })


        }
    }

  }


  createRol(){

    const valida = this.validateFormsRol()

    if(valida){

      this.isLoadingCrearRol = true

      let rol = {

        rol_marca: 1,
        rol_descripcion: this.rolForm.get('rol_descripcion')!.value,
        rol_estado: 1
       
      }
      

      this.serviceMenu.createRol(rol).subscribe(
        data => {
          
          if(data){
           
            this.msg.info('Rol Creado')
            this.getListRoles()
            this.rolForm.reset()
            this.isLoadingCrearRol = false

            
          }else{
            this.msg.error('Error', data)
            this.isLoadingCrearRol = false

          }
         
       
      },
      err => {
        this.msg.error(`Ha ocurrido un error al Crear Rol, ${err.error.message}`);
        this.isLoadingCrearRol = false

      })
    }
  }

  updateRol(){

    this.modalUpdateRol = false

  }

  openModalGestionRol(rol: any){

  
    this.modalGestionRol = true
    this.getListaRolesAsignacion(rol.rol_codigo)
    this.codigoRol = rol.rol_codigo


  }

  openModalEditRol(rol: any){

    this.modalUpdateRol = true
    this.codigoRol = rol.rol_codigo
    this.rolForm.setValue({
      rol_descripcion: rol.rol_descripcion,
      
    })

  }

  getListRoles(){
    this.rol$ = this.serviceMenu.getListAllRol$()
    
    this.subRol = this.rol$.subscribe(p => {
      //console.log(p);
      
      this.listRol = p.listRol

      this.cargandoRol = p.cargando

      if(this.cargandoRol == false){
        this.subRol.unsubscribe()
       
      }
    });

  }


  getListaRolesAsignacion(rol_codigo: any){

    this.rolasignacion$ = this.serviceMenu.getListAllRolesAsignacion$(rol_codigo)
      
    this.subRolAsignacion = this.rolasignacion$.subscribe(p => {
      //console.log(p);
      
      this.listRolAsignacion = p.listRolAsignacion

      this.cargandoRolAsignacion = p.cargando

      if(this.cargandoRolAsignacion == false){


        
        this.listAsignadoRol = this.listRolAsignacion.misMenus
        this.listSinAsignadoRol = this.listRolAsignacion.menusSinPadres

        this.subRolAsignacion.unsubscribe()
       
      }
    });
    
  }

  aceptarRol(){
    this.modalGestionRol = false
  }


  dropRol(event: CdkDragDrop<string[]>, tipoAsignar: any) {

    if (event.previousContainer === event.container) {     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const prev_idx = event.previousIndex;    
      this.itemMenu = event.previousContainer.data[prev_idx];

      if(tipoAsignar == 'asignado'){

        let rolmenu = {

          mer_men_codigo: this.itemMenu.men_codigo,
          mer_rol_codigo: this.codigoRol,
          mer_marca: this.itemMenu.men_marca,
          mer_estado: this.itemMenu.men_estado,

        }
      

        this.serviceMenu.asignacionRolMenu(rolmenu).subscribe(
          data => {
            
            if(data){
              this.msg.info('Menú Rol Agregado')
            }
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Asignar Menu para Rol, ${err.error.message}`);
        })
      }

      if(tipoAsignar == 'asignar'){

        let rolmenu = {

          mer_men_codigo: this.itemMenu.men_codigo,
          mer_rol_codigo: this.codigoRol,
          mer_marca: this.itemMenu.men_marca,
          mer_estado: 0,

        }
      

        this.serviceMenu.asignacionRolMenu(rolmenu).subscribe(
          data => {
            
            if(data){
              this.msg.info('Menú Rol Desactivado')
            }
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Desactivar Menu para Rol, ${err.error.message}`);
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


  getListaPermisosAsignacion(rol_codigo: any){

    this.permisoasignacion$ = this.serviceMenu.getListAllPermisoAsignacion$(rol_codigo)
      
    this.subPermisoAsignacion = this.permisoasignacion$.subscribe(p => {
      //console.log(p);
      
      this.listPermisoAsignacion = p.listPermisoAsignacion

      this.cargandoPermisoAsignacion = p.cargando

      if(this.cargandoPermisoAsignacion == false){


        
        this.listAsignadoPermiso = this.listPermisoAsignacion.misPermisos
        this.listSinAsignadoPermiso = this.listPermisoAsignacion.noPermisosAsigandos

        this.subPermisoAsignacion.unsubscribe()
       
      }
    });
    
  }


  openModalGestionPermisos(rol: any){

    this.modalGestionPermiso = true
    this.getListaPermisosAsignacion(rol.rol_codigo)
    this.codigoRol = rol.rol_codigo


  }

  aceptarPermisos(){
    this.modalGestionPermiso = false
  }


  dropPermiso(event: CdkDragDrop<string[]>, tipoAsignar: any) {

    if (event.previousContainer === event.container) {     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const prev_idx = event.previousIndex;    
      this.itemPermiso = event.previousContainer.data[prev_idx];

      if(tipoAsignar == 'asignado'){

        let rolpermiso = {

          rop_rol_codigo: this.codigoRol,
          rop_per_codigo: this.itemPermiso.per_codigo,
          rop_estado: this.itemPermiso.per_estado,

        }
      
      
        console.log(rolpermiso);

        this.serviceMenu.asignacionRolPermiso(rolpermiso).subscribe(
          data => {
            
            if(data){
              this.msg.info('Menú Permiso Agregado')
            }
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Asignar Permiso para Rol, ${err.error.message}`);
        })
      }

      if(tipoAsignar == 'asignar'){

        let rolmenu = {

          rop_rol_codigo: this.codigoRol,
          rop_per_codigo: this.itemPermiso.per_codigo,
          rop_estado: 0,

        }
      
      
        console.log(rolmenu);

        this.serviceMenu.asignacionRolPermiso(rolmenu).subscribe(
          data => {
            
            if(data){
              this.msg.info('Menú Permiso Desactivado')
            }
        },
        err => {
          this.msg.error(`Ha ocurrido un error al Desactivar Permiso para Rol, ${err.error.message}`);
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


  getListEmpresas(){
    this.empresa$ = this.serviceMenu.getListAllEmpresa$()
    
    this.subEmpresa = this.empresa$.subscribe(p => {
      //console.log(p);
      
      this.listEmpresa = p.listEmpresa

      this.cargandoEmpresa = p.cargando

      if(this.cargandoEmpresa == false){
        this.subEmpresa.unsubscribe()
       
      }
    });

  }





}
