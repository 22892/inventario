import { Component, Input, OnInit } from '@angular/core';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import * as moment from 'moment';
import 'moment/locale/es';
import { GlobalserviceService } from '../../../../core/globalservice.service'


interface ColumnItemDos {

  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  width:string;
}


interface ColumnItem {

  name: string | undefined;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  width:string;
  value: any;
  icon: any | undefined;
}




@Component({
  selector: 'app-tablaestados',
  templateUrl: './tablaestados.component.html',
  styleUrls: ['./tablaestados.component.scss']
})
export class TablaestadosComponent implements OnInit {

  listOfColumns: ColumnItem[] = [];
  listOfColumnsDatos: any[] = []
  listDetalleEstado:  any[] = []
  cargarDetalle: boolean = false
  radioValue = 'A';
  tipoVista: number = 1

  listOfColumnsLogistica: ColumnItemDos[] = [

    {
      width: '80px',
      name: 'Vin',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      
    },


    {
      width: '80px',
      name: 'Estado',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Movilización',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },


    {
      width: '80px',
      name: 'Nivel',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Novedad',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Parte Vin',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '80px',
      name: 'Proceso',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },


  ];




  @Input() listColumnsTable: any
  @Input() estadoVin: any
  @Input() informacionVin: any

  objColumnInfoVin = [{name: 'Estado', icon:'', ancho:'60px'},{name: 'Codigo Inventario', icon:'', ancho:'40px'}, {name: 'Marca', icon:'', ancho:'50px'}, {name: 'Empresa Inventario', icon:'', ancho:'60px'}, {name: 'Pro Codigo', icon:'', ancho:'60px'}, {name: 'Pro Nombre', icon:'', ancho:'60px'}, {name: 'Vin', icon:'', ancho:'60px'},
  {name: 'Placa', icon:'', ancho:'50px'}, {name: 'Código Configuración', icon:'', ancho:'50px'}, {name: 'Código Garantia', icon:'', ancho:'50px'}, {name: 'SPEC Codigo', icon:'', ancho:'50px'},{name: 'Marca Vehiculo', icon:'', ancho:'50px'},{name: 'Marca ID', icon:'', ancho:'50px'},{name: 'Codigo Modelo', icon:'', ancho:'50px'},{name: 'Modelo ID', icon:'', ancho:'50px'},
  {name: 'Codigo Versión', icon:'', ancho:'50px'},{name: 'Versión Id', icon:'', ancho:'50px'},{name: 'Codigo Color', icon:'', ancho:'50px'},{name: 'Codigo Categoria', icon:'', ancho:'50px'},{name: 'Codigo Segmento', icon:'', ancho:'50px'},{name: 'Código Sub categoria vehiculo', icon:'', ancho:'50px'},{name: 'Imagen', icon:'', ancho:'50px'},
  {name: 'Modelo', icon:'', ancho:'50px'},{name: 'Versión', icon:'', ancho:'50px'},{name: 'Año', icon:'', ancho:'50px'},{name: 'Color Id Interior', icon:'', ancho:'50px'},{name: 'Color Nombre Interior', icon:'', ancho:'50px'},{name: 'Color ID', icon:'', ancho:'50px'},{name: 'Color', icon:'', ancho:'50px'},{name: 'Clase', icon:'', ancho:'50px'},
  {name: 'Subclase', icon:'', ancho:'50px'},{name: 'Combustible', icon:'', ancho:'50px'},{name: 'Transmición', icon:'', ancho:'50px'},{name: 'Categoria', icon:'', ancho:'50px'},{name: 'Categoria Vehiculo', icon:'', ancho:'50px'},{name: 'Segmento Vehiculo', icon:'', ancho:'50px'},{name: 'Estado Marca', icon:'', ancho:'50px'},
  {name: 'Col Estado marca', icon:'', ancho:'50px'},{name: 'Estado Emp. Asignado', icon:'', ancho:'50px'},{name: 'Color Empleado', icon:'', ancho:'50px'},{name: 'Nombre Estado Producto', icon:'', ancho:'50px'},{name: 'Col estado Producto', icon:'', ancho:'50px'},{name: 'Estado Almacen', icon:'', ancho:'50px'},{name: 'Col Estado Almacen', icon:'', ancho:'50px'},{name: 'Estado Homologado', icon:'', ancho:'50px'},
  {name: 'Estado test Drive', icon:'', ancho:'50px'}, {name: 'Estado Reserva', icon:'', ancho:'50px'},{name: 'Factura Biss', icon:'', ancho:'50px'}, {name: 'Sub Categoria Vehiculo', icon:'', ancho:'50px'}, {name: 'ID', icon:'', ancho:'50px'}, {name: 'Estado Etapa', icon:'', ancho:'50px'}, {name: 'Motor', icon:'', ancho:'50px'}, {name: 'Fecha Crea Pedido', icon:'', ancho:'50px'},
  {name: 'Pack', icon:'', ancho:'50px'},{name: 'Año Producción', icon:'', ancho:'50px'}, {name: 'Mes Producción', icon:'', ancho:'50px'}, {name: 'Fecha LLegada', icon:'', ancho:'50px'},{name: 'Nombre Buque', icon:'', ancho:'50px'},{name: 'Año Modelo', icon:'', ancho:'50px'}, {name: 'SSC', icon:'', ancho:'50px'},{name: 'Grade', icon:'', ancho:'50px'},
  {name: 'OCN', icon:'', ancho:'50px'}, {name: 'Código Color Exterior', icon:'', ancho:'50px'}, {name: 'Nombre Color Exterior', icon:'', ancho:'50px'}, {name: 'SAP Color Exterior', icon:'', ancho:'50px'}, {name: 'Descripción Color SAP', icon:'', ancho:'50px'},{name: 'Código Color Interior', icon:'', ancho:'50px'},{name: 'Material', icon:'', ancho:'50px'},
  {name: 'Lote', icon:'', ancho:'50px'},{name: 'Orden Compra', icon:'', ancho:'50px'},{name: 'ACT Estado', icon:'', ancho:'50px'}, {name: 'ACT fecha', icon:'', ancho:'50px'}, {name: 'ACT Observación', icon:'', ancho:'50px'}, {name: 'Rev Estado', icon:'', ancho:'50px'}, {name: 'Rev Fecha', icon:'', ancho:'50px'}, {name: 'Rev Observación', icon:'', ancho:'50px'},
  {name: 'Estado Curbe', icon:'', ancho:'50px'}, {name: 'Estado Observación', icon:'', ancho:'50px'}, {name: 'vehiculoDetalle', icon:'', ancho:'50px'}, {name: 'Estado Actual', icon:'', ancho:'50px'}, {name: 'Lista estados', icon:'', ancho:'50px'}, {name: 'Observaciones', icon:'', ancho:'50px'}]


  objColumnPedido = [{name: 'Vin', icon:'', ancho:'60px'},{name: 'Marca Emp.', icon:'', ancho:'40px'}, {name: 'Motor', icon:'', ancho:'50px'}, {name: 'Marca Vehiculo', icon:'', ancho:'60px'}, {name: 'Modelo', icon:'', ancho:'60px'}, {name: 'Versión', icon:'', ancho:'60px'}, {name: 'Fecha Creación', icon:'', ancho:'60px'},
  {name: 'Pack', icon:'', ancho:'50px'}, {name: 'Año Producción', icon:'', ancho:'50px'}, {name: 'Mes Producción', icon:'', ancho:'50px'},{name: 'Fecha LLegada', icon:'', ancho:'60px'},{name: 'Buque', icon:'', ancho:'50px'},{name: 'Año Modelo', icon:'', ancho:'50px'},{name: 'SSC', icon:'', ancho:'50px'},
  {name: 'Grade', icon:'', ancho:'50px'}, {name: 'OCN', icon:'', ancho:'50px'}, {name: 'Cod. Color Ext', icon:'', ancho:'50px'},{name: 'Nombre Color Ext', icon:'', ancho:'60px'},{name: 'Cod. SAP color Ext', icon:'', ancho:'50px'}, {name: 'Descripción color SAP', icon:'', ancho:'60px'}, {name: 'Cod. color Int.', icon:'', ancho:'60px'},
  {name: 'Material', icon:'', ancho:'60px'},{name: 'Lote', icon:'', ancho:'50px'}, {name: 'Orden Compra', icon:'', ancho:'60px'}, {name: 'ACT Estado', icon:'', ancho:'50px'}, {name: 'ACT Fecha', icon:'', ancho:'60px'},{name: 'ACT Observación', icon:'', ancho:'60px'}, {name: 'REV Estado', icon:'', ancho:'50px'}, {name: 'REV Fecha', icon:'', ancho:'50px'},
  {name: 'REV Observación', icon:'', ancho:'50px'}, {name: 'Estado Curbe', icon:'', ancho:'40px'}]


  objColumnFactura = [{name: 'Vin', icon:'', ancho:'60px'},{name: 'Marca Emp.', icon:'', ancho:'40px'}, {name: 'SOC', icon:'', ancho:'50px'}, {name: 'Factura', icon:'', ancho:'60px'}, {name: 'TDOC', icon:'', ancho:'60px'}, {name: 'Fecha Factura', icon:'', ancho:'60px'}, {name: 'Número Pedido', icon:'', ancho:'60px'},
  {name: 'SOLIC', icon:'', ancho:'50px'}, {name: 'NIF', icon:'', ancho:'50px'}, {name: 'Nombre Responsable', icon:'', ancho:'50px'},{name: 'Nombre 2 Resp.', icon:'', ancho:'60px'},{name: 'Material', icon:'', ancho:'50px'},{name: 'Descripción Material', icon:'', ancho:'50px'},{name: 'Cantidad', icon:'', ancho:'50px'},
  {name: 'Documento Venta', icon:'', ancho:'50px'}, {name: 'Sector', icon:'', ancho:'50px'}, {name: 'Centro', icon:'', ancho:'50px'},{name: 'Referencia', icon:'', ancho:'60px'},{name: 'Referencia FICO', icon:'', ancho:'50px'}, {name: 'Moneda', icon:'', ancho:'60px'}, {name: 'Impuesto Final', icon:'', ancho:'60px'},
  {name: 'Valor Neto', icon:'', ancho:'60px'},{name: 'Valor Venta', icon:'', ancho:'50px'}, {name: 'Valor DS', icon:'', ancho:'60px'}, {name: 'Valor Total', icon:'', ancho:'50px'}, {name: 'Subtotal 14', icon:'', ancho:'60px'},{name: 'Subtotal 15', icon:'', ancho:'60px'}, {name: 'Subtotal 16', icon:'', ancho:'50px'}, {name: 'Valor Descuento', icon:'', ancho:'50px'},
  {name: 'PV Cliente', icon:'', ancho:'50px'}, {name: 'Descuento Neto', icon:'', ancho:'40px'}, {name: 'Interes', icon:'', ancho:'40px'}, {name: 'valor Iva', icon:'', ancho:'40px'}, {name: 'Org. Venta', icon:'', ancho:'40px'}, {name: 'Cond. Pago', icon:'', ancho:'40px'}, {name: 'CLVALORAC', icon:'', ancho:'40px'},
  {name: 'Bultos', icon:'', ancho:'40px'}, {name: 'Canal', icon:'', ancho:'40px'}, , {name: 'Tipo Cambio', icon:'', ancho:'40px'}, , {name: 'Fecha Actualización', icon:'', ancho:'40px'}, {name: 'Ciudad LLegada', icon:'', ancho:'40px'}, {name: 'Vitrina', icon:'', ancho:'40px'}, {name: 'Responsable', icon:'', ancho:'40px'},
  {name: 'Observación', icon:'', ancho:'40px'}, {name: 'Fecha Salida', icon:'', ancho:'40px'}, {name: 'Fecha LLegada', icon:'', ancho:'40px'}]


  objColumnNacionalizacion = [{name: 'Vin', icon:'', ancho:'60px'},{name: 'Marca Emp.', icon:'', ancho:'40px'}, {name: 'ITEM', icon:'', ancho:'50px'}, {name: 'Mes Arribo', icon:'', ancho:'60px'}, {name: 'Cobro Liberación', icon:'', ancho:'60px'}, {name: 'Factura Porteo', icon:'', ancho:'60px'}, {name: 'Número Nacionalizción', icon:'', ancho:'60px'},
  {name: 'SAP', icon:'', ancho:'50px'}, {name: 'Entrega Entrante', icon:'', ancho:'50px'}, {name: 'ZGRE', icon:'', ancho:'50px'},{name: 'Buque', icon:'', ancho:'60px'},{name: 'BL Número', icon:'', ancho:'50px'},{name: 'Factura', icon:'', ancho:'50px'},{name: 'Fecha Factura', icon:'', ancho:'50px'},
  {name: 'FSC', icon:'', ancho:'50px'}, {name: 'Valor FOB USD', icon:'', ancho:'50px'}, {name: 'Flete USD', icon:'', ancho:'50px'},{name: 'Seguro USD', icon:'', ancho:'60px'},{name: 'RI', icon:'', ancho:'50px'}, {name: 'Fecha BL', icon:'', ancho:'60px'}, {name: 'Fecha Factura', icon:'', ancho:'60px'},
  {name: 'Facha LLegada Buque', icon:'', ancho:'60px'},{name: 'Dias Transito', icon:'', ancho:'50px'}, {name: 'Fecha LLegada DCTOS', icon:'', ancho:'60px'}, {name: 'Entrega DCT', icon:'', ancho:'50px'}, {name: 'Solicitud Nacionalización', icon:'', ancho:'60px'},{name: 'Declaración Importación', icon:'', ancho:'60px'}, {name: 'Fecha Presentación', icon:'', ancho:'50px'}, {name: 'Número Sticker', icon:'', ancho:'50px'},
  {name: 'Fecha Pago', icon:'', ancho:'50px'}, {name: 'Número Levante', icon:'', ancho:'40px'}, {name: 'Fecha Levante', icon:'', ancho:'40px'}, {name: 'Subpartida', icon:'', ancho:'40px'}, {name: 'CEPD', icon:'', ancho:'40px'}, {name: 'Tipo Carroceria', icon:'', ancho:'40px'}, {name: 'Clase Vehiculo', icon:'', ancho:'40px'},
  {name: 'Número Puertas', icon:'', ancho:'40px'}, {name: 'Número Pasajeros', icon:'', ancho:'40px'}, , {name: 'Cilindrada', icon:'', ancho:'40px'}, , {name: 'Potencia', icon:'', ancho:'40px'}, {name: 'Peso Bruto Vehiculo', icon:'', ancho:'40px'}, {name: 'CIF', icon:'', ancho:'40px'}, {name: 'TRM', icon:'', ancho:'40px'},
  {name: 'Valor CIF', icon:'', ancho:'40px'}, {name: 'Base Arancel', icon:'', ancho:'40px'}, {name: 'Porcentaje Arancel', icon:'', ancho:'40px'}, {name: 'Gravame', icon:'', ancho:'40px'}, {name: 'Base Iva', icon:'', ancho:'40px'}, {name: 'Porcentaje Iva', icon:'', ancho:'40px'}, {name: 'Total Iva', icon:'', ancho:'40px'}, {name: 'Total Impuestos', icon:'', ancho:'40px'},
  {name: 'Pagas OEA', icon:'', ancho:'40px'}, {name: 'Pais Compra', icon:'', ancho:'40px'}, {name: 'Pais Origen', icon:'', ancho:'40px'}, {name: 'Puerto Embarque', icon:'', ancho:'40px'}, {name: 'Puerto Arribo', icon:'', ancho:'40px'}, {name: 'Fecha Vencimiento RM', icon:'', ancho:'40px'}, {name: 'LC', icon:'', ancho:'40px'}]


  objColumnTraslado = [{name: 'Nombre Conductor', icon:'', ancho:'60px'},{name: 'Nombre Empresa', icon:'', ancho:'40px'}, {name: 'Placa', icon:'', ancho:'50px'}, {name: 'Estado Proceso', icon:'', ancho:'60px'}, {name: 'Logistica', icon:'', ancho:'60px'}, {name: 'Comercial', icon:'', ancho:'60px'}, {name: 'Transportista', icon:'', ancho:'60px'}]

  objColumnLogisticaz = [{name: 'Codigo', icon: '', ancho:'60px'},{name: 'Marca', icon: '', ancho:'60px'},{name: 'Comentario', icon: '', ancho:'60px'},{name: 'Vin', icon: '', ancho:'60px'},{name: 'Grupo', icon: '', ancho:'60px'},{name: 'Daño', icon: '', ancho:'60px'},{name: 'Tamaño', icon: '', ancho:'60px'},{name: 'Parte', icon: '', ancho:'60px'},{name: 'X', icon: '', ancho:'60px'},{name: 'Y', icon: '', ancho:'60px'},
  {name: 'Parte', icon: '', ancho:'60px'},{name: 'Proceso', icon: '', ancho:'60px'},{name: 'Estado', icon: '', ancho:'60px'}, {name: 'Movilización', icon: '', ancho:'60px'},{name: 'Novedad', icon: '', ancho:'60px'},{name: 'Parte', icon: '', ancho:'60px'},{name: 'Nivel', icon: '', ancho:'60px'},{name: 'Estado', icon: '', ancho:'60px'}]

  listImagenesEstado: any


  

  constructor(private serviceGlobal: GlobalserviceService) {
  }

  ngOnInit(): void {
    //console.log('lleggaaaaaaaaaaa');
    this.listImagenesEstado = this.serviceGlobal.getListImagesEstado()
    this.generarColumnas()

  }


  transformDate(newDate: any): any{
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    var hora = moment(newDate,'HH:mm:ss').format("HH");
    var minuto = moment(newDate,'HH:mm:ss').format("mm");

    let fecha = dia + " de "+ mes +" del "+anio +' '+hora+':'+minuto

    return fecha
  }


  isNum(val: any){

    return !isNaN(val)
  }


  generarColumnas(){


    let listAux: any = []
    let listInfo: any = []

    if(this.listColumnsTable){

      listAux = Object.values(this.listColumnsTable)
      listInfo = Object.values(this.informacionVin)
     
      var i=0


      if(this.estadoVin.est_codigo == 100){


        this.objColumnInfoVin.forEach((item) =>{

          if(listInfo[i] != null){

            let columna: any
            let result: any

            var resNum = this.isNum(listInfo[i])

            if(resNum){
              result = false
            }else{

              ////console.log('objeto');
              if(typeof listInfo[i] == 'undefined'){
                //console.log('siiii');

              }else{
                ////console.log('noooo');

              }

              result = moment(new Date(listInfo[i]), 'YYYY-MM-DD',true).isValid();

            }

            if(result){

              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: this.transformDate(listInfo[i]),
                icon: item?.icon
              }

            }else{
              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: listInfo[i],
                icon: item?.icon
              }

            }


            this.listOfColumns = [... this.listOfColumns, columna]

          }



          i++

        })

        this.listDetalleEstado = [... this.listDetalleEstado, this.informacionVin]

        ////console.log('infooooooooo');
        ////console.log(this.listOfColumns);


      }


      if(this.estadoVin.est_codigo == 11){


        this.objColumnPedido.forEach((item) =>{


          let columna: any
          let result: any



          if(listAux[i] != null){



            var resNum = this.isNum(listAux[i])

            if(resNum){
              result = false
            }else{
              result = moment(new Date(listAux[i].replace(/ /g, "")), 'YYYY-MM-DD',true).isValid();

            }

            if(result){

              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: this.transformDate(listAux[i]),
                icon: item?.icon
              }

            }else{
              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: listAux[i],
                icon: item?.icon
              }

            }



            this.listOfColumns = [... this.listOfColumns, columna]

          }



          i++

        })

        this.listDetalleEstado = [... this.listDetalleEstado, this.listColumnsTable]
        ////console.log('listofcolumn');
        ////console.log(this.listOfColumns);

      }

      if(this.estadoVin.est_codigo == 14){

        this.objColumnFactura.forEach((item) =>{


          let columna: any
          let result: any



          if(listAux[i] != null){



            var resNum = this.isNum(listAux[i])

            if(resNum){
              result = false
            }else{
              result = moment(new Date(listAux[i].replace(/ /g, "")), 'YYYY-MM-DD',true).isValid();

            }

            if(result){

              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: this.transformDate(listAux[i]),
                icon: item?.icon
              }

            }else{
              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: listAux[i],
                icon: item?.icon
              }

            }



            this.listOfColumns = [... this.listOfColumns, columna]

          }


          i++

        })

        this.listDetalleEstado = [... this.listDetalleEstado, this.listColumnsTable]


      }

      if(this.estadoVin.est_codigo == 15){

        this.objColumnNacionalizacion.forEach((item) =>{

          let columna: any
          let result: any

         

          if(listAux[i] != null){



            var resNum = this.isNum(listAux[i])

            if(resNum){
              result = false
            }else{
              result = moment(new Date(listAux[i].replace(/ /g, "")), 'YYYY-MM-DD',true).isValid();

            }

            if(result){

              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: this.transformDate(listAux[i]),
                icon: item?.icon
              }

            }else{
              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: listAux[i],
                icon: item?.icon
              }

            }



            this.listOfColumns = [... this.listOfColumns, columna]

          }


          i++

        })

        this.listDetalleEstado = [... this.listDetalleEstado, this.listColumnsTable]


      }



      if(this.estadoVin.est_codigo == 16 || this.estadoVin.est_codigo == 17 || this.estadoVin.est_codigo == 18){




        this.objColumnTraslado.forEach((item) =>{

          let columna: any
          let result: any


          

          if(listAux[i] != null){



            var resNum = this.isNum(listAux[i])




            if(resNum){
              result = false
            }else{
              result = moment(new Date(listAux[i].replace(/ /g, "")), 'YYYY-MM-DD',true).isValid();
            }

            if(result){

              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: this.transformDate(listAux[i]),
                icon: item?.icon
              }

            }else{
              columna = {
                width:'100px',
                name: item?.name,
                sortOrder: null,
                sortFn: null,
                sortDirections: [],
                filterMultiple: true,
                listOfFilter:[],
                filterFn: null,
                value: listAux[i],
                icon: item?.icon
              }

            }



            this.listOfColumns = [... this.listOfColumns, columna]

          }


          i++

        })

        this.listDetalleEstado = [... this.listDetalleEstado, this.listColumnsTable]


      }

      
      if(this.estadoVin.est_codigo == 27 ){

        
        this.listOfColumnsDatos = this.listColumnsTable

        //console.log('kkkkkkkkkkkkkk');
        //console.log(this.listOfColumnsDatos);
        
        
        
      }


    
      


      /*for (const property in this.informacionVin) {

        //console.log(property);

        let columna = {
          width:'130px',
          name: property,
          sortOrder: null,
          sortFn: null,
          sortDirections: [],
          filterMultiple: true,
          listOfFilter:[],
          filterFn: null,
          value: listAux[i],
          icon: ''
        }

        this.listOfColumns = [... this.listOfColumns, columna]

        i++


      }

      this.listDetalleEstado = [... this.listDetalleEstado, this.listColumnsTable]
      //console.log('listofcolumn');
      //console.log(this.listOfColumns);*/






    }



  }




  cambioVista(tipoVista: number){

    this.tipoVista = tipoVista

  }



}
