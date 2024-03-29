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
  private marca: any = 0
  private listGuiasRemision: any[] = []
  private codigoGuia: any = 0
  private usr_codigo: any

  listImagesEstados: any[] = [
    
    {codigo: 1, url: '../../assets/images/activo.png'}, {codigo: 2, url: '../../assets/images/consignado.png'}, {codigo: 3, url: '../../assets/images/evento.png'},
    {codigo: 4, url: '../../assets/images/facturacion.png'}, {codigo: 5, url: '../../assets/images/nacionalizacion.png'}, {codigo: 6, url: '../../assets/images/traslado.png'},
    {codigo: 7, url: '../../assets/images/desasignado.png'}, {codigo: 11, url: '../../assets/images/pedido.png'}, {codigo: 12, url: '../../assets/images/consignado.png'},
    {codigo: 13, url: '../../assets/images/evento.png'}, {codigo: 14, url: '../../assets/images/facturacion.png'}, {codigo: 15, url: '../../assets/images/nacionalizacion.png'},
    {codigo: 16, url: '../../assets/images/disponible.png'}, {codigo: 17, url: '../../assets/images/solicitudtraslado.png'}, {codigo: 18, url: '../../assets/images/trasladoaprobado.png'},
    {codigo: 19, url: '../../assets/images/trasladonegado.png'}, {codigo: 20, url: '../../assets/images/entransito.png'}, {codigo: 21, url: '../../assets/images/entregadoevento.png'},
    {codigo: 22, url: '../../assets/images/entregado.png'}, {codigo: 23, url: '../../assets/images/trasladoliberado.png'}, {codigo: 29, url: '../../assets/images/trasladoescala.png'},
    
  ]


  constructor(@Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
  }


  getListImagesEstado(): any{

    return this.listImagesEstados

  }


  getCodigoUsuario(): any{

    let usuario: any = localStorage.getItem("usuario");
    let user = JSON.parse(usuario)
    return this.usr_codigo = user.usr_codigo
    
    
  }


  setCodigoUsuario(usr_codigo: any){
    this.usr_codigo = usr_codigo
  }

  getCodigoMarca(): any{
    let login: any = localStorage.getItem("login");
    let marca = JSON.parse(login)
    return this.marca = marca.marca
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

  setListGuiaRemision(lista: any){
    this.listGuiasRemision = lista
  }

  getListGuiaRemision(): any{
    return this.listGuiasRemision
  }

  setCodigoGuia(gur_codigo: any): any{
    this.codigoGuia = gur_codigo
  }

  getCodigoGuia(): any{
    return this.codigoGuia
  }

}
