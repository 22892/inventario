import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../core/auth.service'
import { GlobalserviceService } from '../../core/globalservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  array = [
    {img:'../../../assets/images/portada1.png'},
    {img:'../../../assets/images/logo2.jpg'}
  ];
  validateForm!: FormGroup;
  cargando: boolean = false;

  isVisiblePassword: boolean = false
  recoverForm!: FormGroup;
  passwordForm!: FormGroup;
  isLoadingContasena: boolean = false
  

  constructor(private fb: FormBuilder, 
    private router: Router,
    private notification: NzNotificationService, 
    private msg: NzMessageService,
    private serviceAuth: AuthService,
    private serviceGlobal: GlobalserviceService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]      
    });

  
  }

  createNotification(type: string, titulo:string,mensaje:string): void {
    this.notification.create(
      type,
      titulo,
      mensaje,
      { nzPlacement: 'bottomLeft' }
    );
  }


  submitForm(){

    if(this.validateForm.valid){
      this.cargando == true;
      let username = this.validateForm.get('userName')!.value;
      let password = this.validateForm.get('password')!.value;

      let data = {
        username: username,
        password: password,
        token: "token"
      }

      let usr = {
        usrlogin: {username: username, password: password, token: "token"}
      }


      this.cargando = true
      this.serviceAuth.loginUser(data).subscribe(res =>{
       
        console.log(res);
        this.serviceAuth.setCredentials(res, usr)
        this.router.navigate(['/menu']);
        this.createNotification('success','Bienvenido','');
        this.cargando = false
          
      },
      err => {
        
        this.msg.error(`Error al Login, ${err.error.message}`);
        this.cargando = false

      })
    }
    else{
      this.cargando = false
      this.createNotification('warning','Ingrese los campos requeridos','');
    }
  }



  openModalRecoverPassword(){

  }

}
