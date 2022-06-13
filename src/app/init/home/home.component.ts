import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../../appModules/menu/services/menu.service'
import { AuthService } from '../../core/auth.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalserviceService } from '../../core/globalservice.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseUrl: string = ''
  baseUrlUri: string = ''


  
  usuario:any
  isCollapsed:boolean = true;

  configuracion: any =  {men_codigo:0, men_titulo: 'Configuración',men_icono:'tool',men_path:'/menu', level: 0, menusHijos: null}
   
  
  menus: any [] = []
  menupadre$!: Observable<any>;
  sub: any
  cargandoMenus: boolean = false

  porver:number =0;
  colorPrimario: any = "#002c5f"
  colorMenu: any = "#FFFFFF"

  date = new Date().getFullYear();
  login: any

  empresaSelect: any
  listEmpresas: any [] = []



  constructor( private router:Router,
    @Inject('BASE_URL') baseUrl: string,
    private cdRef:ChangeDetectorRef,
    private serviceMenu: MenuService,
    private serviceAuth: AuthService,
    private msg: NzMessageService,
    private serviceGlobal: GlobalserviceService) {

      this.baseUrl = baseUrl
      
      if(this.serviceAuth.user){
        
        this.serviceMenu.updateMenuPrincipal.subscribe( value => {
         
          if(value == true){

            console.log('activaaaaaaaaaaaaaaaaaaaaaaa');
            
         
            this.serviceAuth.loginUser(this.serviceAuth.login).subscribe({
              next: (res) =>{
       
              console.log(res);
            
              this.serviceAuth.setCredencialesUpdate(res)
              this.serviceAuth.getCredentials()
              this.getListMenuPrincipal() 
              this.listEmpresas = this.serviceAuth.user.misEmpresas
              this.empresaSelect = this.listEmpresas[0]
             
              },
              error: (err) => {
                this.msg.info('Error Ejecutar Actualización Menu Login')
              }
            })

          }else{
            console.log('donde entra----->>>>>>>>>>');
            
            this.serviceAuth.getCredentials()
            this.getListMenuPrincipal()
            this.usuario = this.serviceAuth.user
            this.listEmpresas = this.serviceAuth.user.misEmpresas
            this.empresaSelect = this.listEmpresas[0]


          }
          
        });
  
      }

  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }


  ngOnInit(): void {
    console.log('inicia home------');
    this.serviceAuth.getCredentials()

    if (this.serviceAuth.token == undefined || this.serviceAuth.token == '') {
      this.router.navigate(['/']);
    } else{

      this.listEmpresas = this.serviceAuth.user.misEmpresas
      this.empresaSelect = this.listEmpresas[0]
      console.log('empresa---select');
      
      console.log(this.empresaSelect);
      if(this.empresaSelect){
        this.serviceGlobal.setCodigoEmpresa(this.empresaSelect.emp_codigo)
      }
      this.usuario = this.serviceAuth.user
      this.getListMenuPrincipal()
    }
    
   
  }

  getSelectNewEmpresa(){
    console.log('empresa');
    console.log(this.empresaSelect);
    
    this.serviceGlobal.setCodigoEmpresa(this.empresaSelect.emp_codigo)
    
  }

  cerrarSesion(){

    this.serviceAuth.logout()

  }




  getListMenuPrincipal(){

    this.menus = [] 
    this.menus = this.serviceAuth.user.menusWeb    

    if(this.menus){

      this.menus.forEach((padre: any, index: number)=>{

        padre.level = 0

        if(padre.menusHijos.length>0){
          padre.menusHijos.forEach((hijo: any, index: number)=>{
            hijo.level = 1
          })
  
        }else{
          padre.menusHijos = null
        }
      })
  
      //this.menus.unshift(this.configuracion)
  
    }    
  }


  



}
