import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {FormBuilder,FormControl,FormGroup,ValidationErrors,Validators,} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ObservacionService } from '../observacion/services/observacion.service'
import { Observable } from 'rxjs';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder,} from 'ng-zorro-antd/table';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalserviceService } from '../../core/globalservice.service'
import { Router } from '@angular/router';


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
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.scss']
})
export class ObservacionComponent implements OnInit, AfterViewInit {

  @ViewChild('sigPad', { static: false }) sigPad: any;
  sigPadElement: any;
  context: any;
  respaldoContext: any
  isDrawing = false;
  img: any;
  picture: string = "../../../assets/carro.jpeg"
  data: any


  listOfColumnsObservacion: ColumnItem[] = [

    {
      width: '100px',
      name: 'Vin',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    
    {
      width: '110px',
      name: 'Grupo',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
  
    {
      width: '140px',
      name: 'Sección',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '110px',
      name: 'Daño',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },


    {
      width: '110px',
      name: 'Tamaño',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

    {
      width: '150px',
      name: 'Fotos',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },

   
    {
      width: '80px',
      name: 'Acciones',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
   
  ];




  tabs = [
    {
      name: 'Nueva Observación',
      icon: 'form',
    },
    {
      name: 'Listado Observaciónes',
      icon: 'file-search',
    },
    {
      name: 'Listado Accesorios',
      icon: 'check',
    },
    {
      name: 'Documentos',
      icon: 'file-search',
    },
  ];


  size: NzButtonSize = 'large';
  listObservacionVin: any[] = [];
  isLoadinCreateObs: boolean = false
  index: number = 0;
  fileList: NzUploadFile[] = [];
  listFoto: any[] = [];
  listFotoEdit: any[] = []
  base64: any
  observacionForm!: FormGroup;
  codVin: any = 0

  listGrupos: any[] = [];
  listPartes: any[] = [];
  grupos$!: Observable<any>;
  subgrupo: any
  cargandoGrupos: boolean = false
  cargandoParte: boolean = false
  grupo: any
  grupoAccesorio: any
  parte: any
  indexList: any
  indexGrupo: any
  indexAccesorio: any
  indexDano: any
  indexTamano: any

  listTamano: any[] = [];
  tamano$!: Observable<any>;
  subtamano: any
  cargandoTamano: boolean = false

  listDano: any[] = [];
  dano$!: Observable<any>;
  subdano: any
  cargandoDano: boolean = false

  dano: any
  tamano: any
  ejex: any
  ejey: any

  ancho: any = 0
  alto: any = 0
  ejeYOpe: any = 0
  ejeXOpe: any = 0
  
  
  windowWidth = window.innerWidth;
  windowHeight =  document.documentElement.scrollHeight;

  isVisibleModalFoto: boolean = false
  codObservacion: any
  cargandoDetalle: boolean = false
  isLoadingFoto: boolean = false
  verificaPuntoGrafica: boolean = false
  veh_codigo: any

  listCheckListAccesorio: any[] = []
  listChecRespuesta: any[] = []
  listAccesorios: any[] = []

  fileListDoc: NzUploadFile[] = [];
  typeFile: string = '';
  listDocumentoGeneral: any[] = [];
  documentogeneral$!: Observable<any>;
  baseUrl: string = '';
  loadingDocumento: boolean = false
  subDocumento: any
  cargandoDocumento: boolean = false


  constructor(@Inject('BASE_URL') baseUrl: string,
    private element: ElementRef, 
    private fb: FormBuilder,
    private msg: NzMessageService,
    private serviceObservacion: ObservacionService,
    private rutaActiva: ActivatedRoute,
    private serviceGlobal: GlobalserviceService,
    private router: Router) {

      this.baseUrl = baseUrl.substring(0, baseUrl.length-1);

      this.observacionForm = this.fb.group({
        dov_observaciones_estado_fisico: ['', [Validators.required]],
        obs_tipo: [''],
      });

  }

  ngOnInit(): void {

    this.veh_codigo = this.rutaActiva.snapshot.paramMap.get('vin')
    this.getListGrupos()
    this.getListDocumentsVin()
    this.ancho = this.porcentaje(40)
    this.alto = this.ancho / 1.4036

  }

  ngAfterViewInit(): void {
    this.initLienzo()
  }

  porcentaje(porcen: any){
    return (this.windowWidth * porcen) / 100
  }

  
  
  initLienzo(){

    console.log('nitial');
    
    this.sigPadElement = this.sigPad.nativeElement
    this.context = this.sigPadElement.getContext('2d');
    var img = new Image();
    img.src = "../../../assets/images/imagencarro.png";  

    var dimensiones ={
      x: this.ancho,
      y: this.alto
    }
    let self = this;
    img.onload = function(){
      self.context.drawImage(img, 0,0, dimensiones.x, dimensiones.y);
    }
   
    
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }


  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any) {
   
    
    var y = window.pageYOffset;
    
    this.ejeYOpe = (e.screenY + e.y) 
    this.ejeXOpe = (e.x + e.screenX)
    var aux1 = (this.alto + this.windowHeight - 200) - this.ejeYOpe 

    if(this.ejeXOpe < this.windowWidth-100){
      
      if(this.ejeYOpe >= aux1){
        if(this.isDrawing){   
          console.log('antraaaaaaa'); 
        
          this.clear()
          this.initLienzo()
        
        
        }
        this.isDrawing = false
        this.ejeYOpe = 0
      }

    }
  }
  
  private relativeCoords(event: any) {

    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }


  onMouseDown(e: any) {
    
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e: any) {
    
    
    if (this.isDrawing) {

      setTimeout(() => {

        const coords = this.relativeCoords(e);

        this.ejex = (e.offsetX * 100) / this.ancho
        this.ejey = (e.offsetY * 100) / this.alto

        this.context.beginPath();
        this.context.fillStyle = 'red';
        this.context.strokeStyle = 'black';
        this.context.arc(coords.x, coords.y, 10, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.respaldoContext = this.context;

        /*var imageBase64String = this.sigPadElement.toDataURL(); // get the base64 string from the canvas context

        if (typeof localStorage !== 'undefined') {
          console.log('guarda..........');

          localStorage.setItem('canvas', imageBase64String);
        } else {
          console.log('nooooooooooooooooooo');
        }*/
      }, 50);
    }
  }



  submitFormObs(): void {
    for (const key in this.observacionForm.controls) {
      this.observacionForm.controls[key].markAsDirty();
      this.observacionForm.controls[key].updateValueAndValidity();
    }
  }

  validarFormsObs(): boolean {
    let v = true;
    if (!this.observacionForm.valid) {
      this.msg.warning(
        'Ingrese todos los datos requeridos para Agregar Observación'
      );
      this.submitFormObs();
      return false;
    }
    return v;
  }

  addNewObservacionItem(){


    if(this.tamano && this.dano ){

      let observacion = {
        cod_observacion: this.listObservacionVin.length + 1,
        obs_marca: 100,
        obs_comentario: this.observacionForm.get('dov_observaciones_estado_fisico')!.value,
        obs_veh_vin: this.veh_codigo,
        obs_grp_codigo: this.grupo.grp_codigo,
        obs_dan_codigo: this.dano.dan_codigo,
        obs_tam_codigo: this.tamano.tam_codigo,
        obs_par_codigo: this.parte.par_codigo,
        obs_pos_x: this.ejex,
        obs_pos_y: this.ejey,
        file: this.fileList,
        fotos: this.listFoto,
        parte: this.parte.par_nombre,
        dano: this.dano.dan_nombre,
        tamano: this.tamano.tam_nombre,
        grupo: this.grupo.grp_nombre,
      }
  
      console.log('item observacion');
      console.log(observacion);
      
  
      this.listObservacionVin = [...this.listObservacionVin, observacion]
  
      this.observacionForm.reset()
      this.fileList = []
      this.listFoto = []
      this.clear()
      this.initLienzo()
  

    }else{
      this.msg.warning('Tiene que seleccionar Daños y Tamanño')
    }

    
    
  }


  quitarVinObs(item: any){

 
    this.listObservacionVin = this.listObservacionVin.filter((obs) => obs.cod_observacion !== item)    
    console.log('listado qiotado');
    console.log(this.listObservacionVin);

  }



  saveObservacionVin(){

    console.log(this.listObservacionVin);
   

    if(this.listObservacionVin.length>0){

      let accesorio: any

      if(this.listChecRespuesta.length>0){
        this.listChecRespuesta.forEach((respuesta: any, index: number)=>{
  
          accesorio = {
            acc_veh_marca: this.serviceGlobal.getCodigoMarca(),
            acc_veh_vin: this.veh_codigo,
            acc_veh_respuesta: respuesta.par_check,
            acc_veh_par_codigo: respuesta.par_codigo,
            acc_veh_par_grp_codigo: respuesta.grp_codigo
          }
  
          this.listAccesorios = [...this.listAccesorios, accesorio]
  
        })      
      }
  

      this.isLoadinCreateObs = true

      const formData = new FormData();
      var j=0
      
      this.listObservacionVin.forEach((item: any) => {
        
        formData.append('observaciones.observaciones['+j+'].obs_marca', item.obs_marca)
        formData.append('observaciones.observaciones[' + j + '].obs_comentario', item.obs_comentario)
        formData.append('observaciones.observaciones[' + j + '].obs_veh_vin', item.obs_veh_vin)
        formData.append('observaciones.observaciones['+j+'].obs_grp_codigo', item.obs_grp_codigo)
        formData.append('observaciones.observaciones['+j+'].obs_dan_codigo', item.obs_dan_codigo)
        formData.append('observaciones.observaciones['+j+'].obs_tam_codigo', item.obs_tam_codigo)
        formData.append('observaciones.observaciones['+j+'].obs_par_codigo', item.obs_par_codigo)
        formData.append('observaciones.observaciones['+j+'].obs_pos_x', item.obs_pos_x)
        formData.append('observaciones.observaciones['+j+'].obs_pos_y', item.obs_pos_y)
       
        item.file.forEach((doc: any)=>{
          console.log('iiiiiiiiiiiiiiiii');
          formData.append("observaciones.observaciones[" + j + "].file", doc)
        
        })
        j++


      });

      var x = 0
      this.listAccesorios.forEach((item: any) => {

        formData.append('observaciones.listaAccesorios['+x+'].acc_veh_marca', item.acc_veh_marca)
        formData.append('observaciones.listaAccesorios['+x+'].acc_veh_vin', item.acc_veh_vin)
        formData.append('observaciones.listaAccesorios['+x+'].acc_veh_respuesta', item.acc_veh_respuesta)
        formData.append('observaciones.listaAccesorios['+x+'].acc_veh_par_codigo', item.acc_veh_par_codigo)
        formData.append('observaciones.listaAccesorios['+x+'].acc_veh_par_grp_codigo', item.acc_veh_par_grp_codigo)

        x++
      });

      this.serviceObservacion.createObservacionVin(formData).subscribe({
        next: (data) => {

          console.log('creaciondo revision vin');
          console.log(data);
          
          if(data){
            this.isLoadinCreateObs = false
            this.fileList = []
            this.listFoto = []
            this.listAccesorios = []
            this.listObservacionVin = []
            this.listChecRespuesta = []
            this.listCheckListAccesorio = []
            this.msg.success('Observaciones de Vin Realizadas');
            this.router.navigate(['/pedido/lista']);
            
          }else{
            this.isLoadinCreateObs = false
          }
        },
        error: (error) =>{

          this.msg.error(`Ha ocurrido un error al Realizar Verificación de Vin, ${error.error.message}`);
          this.isLoadinCreateObs = false

        }

      })
       
    }else{
      this.msg.warning('Tiene que agragar minimo una observación')
    }

    
  }

  pestanaItem(index: any) {

    if(index == 0){

      setTimeout(() => {
        this.initLienzo()
      }, 500);

    }
  
  }

  checkObservacion(codigo: number){

  }

  beforeUpload = (file: any): any => {
    console.log('click');
    
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    
      this.base64 = reader.result 
      let foto = {
        name: file.name,
        url: this.base64,
        uid: file.uid,
        codVin: this.codVin
       
      }
  
      this.listFoto = [...this.listFoto, foto]
    
      console.log('fotoooooooooooooooo');
      console.log(this.listFoto);
      
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  
    this.fileList = this.fileList.concat(file);
    

    return false;


  }

  deleleteFoto(posicion: any, lista: any[], listaDoc: any[], foto: any){
    
   
    lista = lista.filter( (e) => e.uid !== foto.uid );
    listaDoc = listaDoc.filter( (e) => e.uid !== foto.uid );
    
    console.log('lista filltrada');
    console.log(lista);
    

    this.listObservacionVin[posicion].fotos = lista
    this.listObservacionVin[posicion].file = listaDoc
    

    console.log('lista final---->>>>>--->>>>>>>');
    console.log(this.listObservacionVin);
    
    
    
  }



  deleteItemFoto(item: any){

    this.listFotoEdit = this.listFotoEdit.filter(
      (d) => d.uid !== item.uid
    );
  
    console.log('foto eliminar');
    console.log(item);
    
    console.log('revision-->');
    console.log(this.listObservacionVin);
    

    for(var i=0; i<this.listObservacionVin.length; i++){
      if(this.listObservacionVin[i].cod_observacion == this.codObservacion){
       
        for(var j=0; j<this.listObservacionVin[i].fotos.length; j++){
          
          if(this.listObservacionVin[i].fotos[j].uid == item.uid){
            
            this.deleleteFoto(i,this.listObservacionVin[i].fotos, this.listObservacionVin[i].file, this.listObservacionVin[i].fotos[j])   
          }
        }
      }
    }

    console.log('lista final');
    console.log(this.listObservacionVin);


  }

  openModalFoto(item: any){
    this.isVisibleModalFoto = true
    console.log(item.cod_observacion);
    this.codObservacion = item.cod_observacion
    this.listFotoEdit = []

    console.log('objeto obs vin');
    console.log(this.listObservacionVin);
    

    for(var i=0; i<this.listObservacionVin.length; i++){

      if(this.listObservacionVin[i].cod_observacion == item.cod_observacion){
        this.listFotoEdit =  this.listObservacionVin[i].fotos

      }
    }
    
    console.log('iiiiiiiiiiiiiiiii');
    console.log(this.listFotoEdit);
  
  }

  cerrarModalFoto(){
    this.isVisibleModalFoto == false;
  }


  
  beforeUploadLista = (file: any): boolean => {
    
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    
      this.base64 = reader.result 
      let foto = {
        name: file.name,
        url: this.base64,
        uid: file.uid,
        codVin: this.codVin
       
      }
  
      for(var i=0; i<this.listObservacionVin.length; i++){
        if(this.listObservacionVin[i].cod_observacion == this.codObservacion){
          this.listObservacionVin[i].fotos = [...this.listObservacionVin[i].fotos, foto]
          this.listObservacionVin[i].file = [...this.listObservacionVin[i].file, file]
          
        }
      }

      this.listFotoEdit = [...this.listFotoEdit, foto]
    
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  
    //this.fileList = this.fileList.concat(file);
    

    return false;
  };




  getListGrupos(){
    this.grupos$ = this.serviceObservacion.getListAllGrupos$()
    
    this.subgrupo = this.grupos$.subscribe(p => {
      console.log(p);
      
      this.listGrupos = p.listGrupos
      this.cargandoGrupos = p.cargando

      if(this.cargandoGrupos == false){
        //this.indexGrupo = this.listGrupos[0]
        this.subgrupo.unsubscribe()
      }
    });

  }


  getListParteOfGrup(grupo: any, index: any){
    
    console.log('index grupo');
    console.log(index);
    
    
    this.listPartes =  grupo.lista
    this.grupo = grupo
    console.log(this.listPartes);
    //.indexList = this.listPartes[0]
    this.indexGrupo = this.listGrupos[index]
  }


  getDanoTamano(parte: any, index: any){

    this.indexList = this.listPartes[index]
    this.parte = parte
    this.getListDano()
    this.getListTamano()

  }


  getListDano(){
    this.dano$ = this.serviceObservacion.getListAllDano$()
    
    this.subdano = this.dano$.subscribe(p => {
      //console.log(p);
      
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
      //console.log(p);
      
      this.listTamano = p.listTamano
      this.cargandoTamano = p.cargando

      if(this.cargandoTamano == false){
        this.subtamano.unsubscribe()
      }
    });

  }


  selectDano(dano: any, index: any){
   
    this.isDrawing = false 
  
    this.dano = dano
    this.indexDano = this.listDano[index]
  }

  selectTamano(tamano: any, index: any){
    this.isDrawing = false
    this.tamano = tamano
    this.indexTamano = this.listTamano[index]
  }

  getListGrupoAceesorio(grupo: any, index: any){

    this.grupoAccesorio = grupo
    this.listCheckListAccesorio = grupo.lista
    this.indexAccesorio = this.listGrupos[index]

  }

  saveRespuestaCheckList(respuesta: any){


    console.log('respuesta----');
    console.log(respuesta);
    
    respuesta.grp_codigo = this.grupoAccesorio.grp_codigo

    if(respuesta.par_check == false){
      console.log('enttra aqui');
      
     
      this.listChecRespuesta = [...this.listChecRespuesta, respuesta]
      

    
    }else{
      console.log('repetido');
      
      this.listChecRespuesta = this.listChecRespuesta.filter((check) => check.par_codigo !== respuesta.par_codigo);
      
    }


  }

  beforeUploadDocument = (file: any): boolean => {
    console.log('clickkkk');
    
    this.fileListDoc = this.fileListDoc.concat(file);
    return false;
  };

  
  createListDocumentoObservacion() {

    console.log(this.fileListDoc);
    
    if (this.fileListDoc.length > 0) {
      
      this.loadingDocumento = true
      const formData = new FormData();

      this.fileListDoc.forEach((file: any) => {
        
        formData.append('archivos.file', file)
      
      });

      this.serviceObservacion.uploadFileGeneralVin(formData,this.veh_codigo).subscribe({
      next: (data) => {
            
          console.log(data);

          if(data){
            this.msg.success('Documentos creados correctamente');
            this.fileListDoc= []
            this.loadingDocumento = false
            this.getListDocumentsVin()
    
          }else{
            this.msg.warning('No se agrego los documentos')
          }
        },
        error: (error) => {
          this.msg.error(`Ha ocurrido un error , ${error}`);
          this.loadingDocumento = false
        }
      })
    
    }else{
      this.msg.error(`Debe agregar por lo menos un Documento`);
    }

  }


  getListDocumentsVin() {
    
    this.documentogeneral$ = this.serviceObservacion.getListAllDocuemtoVin$(this.veh_codigo);
    this.subDocumento = this.documentogeneral$.subscribe((p) => {
      console.log('docuemtos ngeneral');
      console.log(p);
      
      this.listDocumentoGeneral = p.listDocumentoGeneral;
      this.cargandoDocumento = p.cargando;

      if(this.cargandoDocumento == false){

        this.subDocumento.unsubscribe()
      }

    });
  }



}
