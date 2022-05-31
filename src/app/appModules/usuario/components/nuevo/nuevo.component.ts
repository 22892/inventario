import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { MenuService } from '../../../menu/services/menu.service'
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';


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
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  listOfColumnsRol: ColumnItem[] = [
    {
      width:'50px',
      name: 'Descripción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter:[],
      filterFn: null
    },
    {
      width:'40px',
      name: 'Gestiónde Roles',
      sortOrder: null,
      sortDirections: [],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];


  usuarioForm!: FormGroup

  usuariostep: any = {
    status: 'process'
  }
  rolstep: any = {
    status: 'wait'
  }
  documentostep: any = {
    status: 'wait'
  }
  hechostep: any = {
    status: 'wait'
  }

  index = 0;
  isLoadingCrearUsuario: boolean = false

  listRol: any[] = [];
  rol$!: Observable<any>;
  cargandoRol: boolean = false
  subRol: any
  seleectListRol: any[] = []

  listUsuario: any[] = []
  usuario$!: Observable<any>;
  cargandoUsuario: boolean = false
  subUsuario: any



  constructor(private router: Router, 
    private msg: NzMessageService, 
    private fb: FormBuilder, 
    private serviceUsuario: UsuarioService,
    private serviceMenu: MenuService) {

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

    this.getListRoles()
    
  }

  handleStepChage(index: any) {
   
    
    if (index == 0) {
      this.usuariostep.status = 'process';
      this.rolstep.status = 'wait';
      //this.documentostep.status = 'wait';
      this.hechostep.status = 'wait';
    }
    else if (index == 1) {
      this.usuariostep.status = 'finish';
      this.rolstep.status = 'process';
      //this.documentostep.status = 'wait';
      this.hechostep.status = 'wait';
    }
    /*else if (index == 2) {
      this.usuariostep.status = 'finish';
      this.rolstep.status = 'finish';
      this.documentostep.status = 'process';
      this.hechostep.status = 'wait';

    }*/
    else if (index == 2) {
      this.usuariostep.status = 'finish';
      this.rolstep.status = 'finish';
      //this.documentostep.status = 'finish';
      this.hechostep.status = 'process';
    }
  }


  onIndexChange(index: number): void {
    
    if(index == 0){

      this.index = index;
      this.handleStepChage(this.index);
    }
    
    if(index == 1){
      if (!this.validateForms())
        return;
      this.index = index;
      this.handleStepChage(this.index);
    }

    if(index == 2){
      
    }


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

  pre(){
    this.index -= 1;
    this.handleStepChage(this.index);

  }

  next(){

    console.log('indexxxxx');
    console.log(this.index);
    

    if(this.index == 0){
      
      let validaForm = this.validateForms()

      if(validaForm){
        
        this.index += 1;
        this.handleStepChage(this.index);

      }

    }

    
  }

  done(){
    if(this.index == 1 && this.seleectListRol.length == 0){
      this.msg.warning('Seleecione un Rol para Usuario');
    } else {
     
      this.crearUsuario()  
    }

        
  }


  crearUsuario(){
    
    console.log('crear---');
    

    let usuario = {
      usr_id: this.usuarioForm.get('usr_id')!.value,
      usr_nombre: this.usuarioForm.get('usr_nombre')!.value,
      usr_telefono: this.usuarioForm.get('usr_telefono')!.value,
      usr_email: this.usuarioForm.get('usr_email')!.value,
      usr_cedula: this.usuarioForm.get('usr_cedula')!.value,
      usr_clave: this.usuarioForm.get('usr_clave')!.value,
      rol_codigo: this.seleectListRol[0].rol_codigo
    }

    console.log(usuario);
    this.isLoadingCrearUsuario = true

    this.serviceUsuario.createUsuario(usuario).subscribe(
      data => {
        
        console.log('respuesta---');
        console.log(data);
        if(data){
          this.usuarioForm.reset()
          this.seleectListRol = []
          this.getListUsuarios()
          this.msg.success('Usuario Creado')
          this.index += 1;
          this.handleStepChage(this.index);
          this.isLoadingCrearUsuario = false
        }else{
          this.msg.warning('Error al crear')
          this.isLoadingCrearUsuario = false
        }
        
    },
    err => {
      this.msg.error(`Ha ocurrido un error al Crear Usuario, ${err.error.message}`);
      this.isLoadingCrearUsuario = false
    })



    

  }


  getListRoles(){
    this.rol$ = this.serviceMenu.getListAllRol$()
    
    this.subRol = this.rol$.subscribe(p => {
      console.log(p);
      
      this.listRol = p.listRol

      this.cargandoRol = p.cargando

      if(this.cargandoRol == false){

        for (var i = 0; i < this.listRol.length; i++) {
          this.listRol[i].rol_verificacion_check = false;
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

  irListaUsuario(){
    this.router.navigate(['usuario/lista']);

  }

  getListUsuarios(){
    this.usuario$ = this.serviceUsuario.getListAllUsuarios$()
    
    this.subUsuario = this.usuario$.subscribe(p => {
      console.log(p);
      
      this.listUsuario = p.listUsuario

      this.cargandoUsuario = p.cargando

      if(this.cargandoUsuario == false){
        this.subUsuario.unsubscribe()
       
      }
    });

  }





}
