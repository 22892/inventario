import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalserviceService } from '../core/globalservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any | undefined;
  token:string | undefined;
  login: any | undefined
  private baseUrl :string="";


  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private serviceGlobal: GlobalserviceService) {

      console.warn('Auth started');
      this.getCredentials();
      this.baseUrl = baseUrl;

  }


  //LOGIN 


  loginUser(data: any): Observable<any> {
  
    let marca = 100//this.serviceGlobal.getCodigoMarca()
    
    
    return this.http.post(`${this.baseUrl}api/auth/login/${marca}/${1}`, data, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    });
  }

  setCredentials(credentials:any, login: any){   
    
    console.log('add login');
    //console.log(login);
    //console.log(credentials);
    
    localStorage.setItem("login",JSON.stringify(login.usrlogin));
    localStorage.setItem("usuario",JSON.stringify(credentials.usuario)); 
    localStorage.setItem("token",credentials.token);
   
  
  }

  setCredencialesUpdate(credentials:any){
    localStorage.setItem("usuario",JSON.stringify(credentials.usuario)); 
    localStorage.setItem("token",credentials.token);
  }



  logout(){
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    this.router.navigate(['/login']);
  }

  getCredentials(){

    //console.log('ejecuta get credenciales--------------->>>>>>>>>>>>');
    
    
    let usuario = localStorage.getItem("usuario");
    let token = localStorage.getItem("token");
    let login = localStorage.getItem("login");

    if(!usuario || !token || !login){
      this.user = undefined;
    }else{
      this.user = JSON.parse(usuario);
      this.token = token;
      this.login = login
    }
  }

}
