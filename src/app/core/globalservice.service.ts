import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  baseUrl:string = "";
  
  private fechaDesde:Date = new Date();
  private fechaHasta:Date = new Date();
  private emp_codigo: any = 1
  private marca: any = 100

  constructor(@Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
  }


  getCodigoMarca(): any{
    return this.marca
  }

  setCodigoMarca(marca: any): any{
    this.marca = marca
  }


  getCodigoEmpresa(): any{
    return this.emp_codigo
  }

  setCodigoEmpresa(emp_codigo: any): any{
    this.emp_codigo = emp_codigo
  }

  getFechaDesde():Date {
    return this.fechaDesde;
  }

  getFechaHasta():Date {
    return this.fechaHasta;
  }

  setFechaDesde(fechaDesde:Date) {
    this.fechaDesde = fechaDesde;

  }

  setfechaHasta(fechaHasta:Date) {
    this.fechaHasta = fechaHasta;
  }

  resetearFecha(){    
    this.setfechaHasta(new Date());
    let desde:Date = new Date();
    desde.setDate(this.fechaHasta.getDate() - 10);    
    this.setFechaDesde(desde);
  }

}
