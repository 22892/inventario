import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {FormBuilder,FormControl,FormGroup,ValidationErrors,Validators,} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ObservacionService } from '../observacion/services/observacion.service'
import { Observable } from 'rxjs';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder,} from 'ng-zorro-antd/table';


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
  parte: any
  indexList: any
  indexGrupo: any
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

  ancho: any = 600
  alto: any = 400
  ejexCanvas: any
  ejeyCanvas: any
  ejeYOpe: any = 0
  ejeXOpe: any = 0
  
  windowWidth = window.innerWidth;
  windowHeight =  document.documentElement.scrollHeight;

  isVisibleModalFoto: boolean = false
  codObservacion: any
  cargandoDetalle: boolean = false


  constructor(private element: ElementRef, 
    private fb: FormBuilder,
    private msg: NzMessageService,
    private serviceObservacion: ObservacionService) {

    this.observacionForm = this.fb.group({
      dov_observaciones_estado_fisico: ['', [Validators.required]],
      obs_tipo: [''],
    });

  }

  ngOnInit(): void {
    this.getListGrupos()
    localStorage.removeItem('canvas'); 

   

  }

  ngAfterViewInit(): void {
    console.log('entra after------------<<<<<<<<<<<<<<<>>>>>>>>>>>>>------------');
    this.initLienzo()

    

  }

  
  
  initLienzo(){

    console.log('nitial');
    
    console.log(this.windowWidth);
    
    
    
    this.ejexCanvas = this.sigPad.nativeElement.offsetLeft
    this.ejeyCanvas = this.sigPad.nativeElement.offsetTop
    


    this.sigPadElement = this.sigPad.nativeElement
    this.context = this.sigPadElement.getContext('2d');
    var img = new Image();
    img.src = "../../../assets/images/imagencarro.png";
    img.height = 10
    img.width = 10
    
    this.context.drawImage(img, 0,0, this.ancho,this.alto);
    let self = this;
    img.onload = function(){
      self.context.drawImage(img, 0,0, 600, 400);
    }
    
  }

  limpiarLienzo() {
   
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  /*@HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    console.log(event);
    
    this.element.nativeElement.scrollLeft += event.deltaY;
  }*/


  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any) {
   
    //console.log('sraaaaaa');
    console.log(e);

    
    var y = window.pageYOffset;
    //console.log(y);
    
    
    //console.log(this.isDrawing);
    //console.log(e.offsetX);
    
    
    //console.log(e.clientX +' >= ' + this.ejexCanvas +' && '+ e.clientX + ' <= ' +this.ancho +'&&'+ e.clientY +' >= '+ this.ejeyCanvas +' && '+ e.clientY +'<='+ this.alto );
    
    
    
    this.ejeYOpe = (e.screenY + e.y) 
    this.ejeXOpe = (e.x + e.screenX)
    var aux1 = (this.alto + this.windowHeight - 200) - this.ejeYOpe 

    //console.log('rsulta');
    
    //console.log(this.ejeYOpe);
    //console.log(e.screenY - e.y);
    
    //this.msg.info('resul '+this.ejeYOpe+' '+aux1)

    if(this.ejeXOpe < this.windowWidth-100){
      
      if(this.ejeYOpe >= aux1){
        //console.log('antraaaaaaa');
        
        if(this.isDrawing){    
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
    console.log('move');
     console.log(e);
     
    this.isDrawing = true;
    //this.initLienzo()
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e: any) {
    
    
    if (this.isDrawing) {

      setTimeout(() => {

        const coords = this.relativeCoords(e);

        this.context.beginPath();
        this.context.fillStyle = 'red';
        this.context.strokeStyle = 'black';
        
        //console.log('dibujo');
        //console.log(this.context.canvas.nodeName);
        //console.log(this.context.canvas.offsetTop);
        

        

        this.ejex = coords.x
        this.ejey = coords.y

        this.context.arc(coords.x, coords.y, 10, 0, 2 * Math.PI);

        
        this.context.fill();
        this.context.stroke();
        this.respaldoContext = this.context;

        var imageBase64String = this.sigPadElement.toDataURL(); // get the base64 string from the canvas context

        if (typeof localStorage !== 'undefined') {
          console.log('guarda..........');

          localStorage.setItem('canvas', imageBase64String);
        } else {
          console.log('nooooooooooooooooooo');
        }
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


    //if(this.tamano && this.dano ){

      let observacion = {
        cod_observacion: this.listObservacionVin.length + 1,
        obs_marca: 100,
        obs_comentario: this.observacionForm.get('dov_observaciones_estado_fisico')!.value,
        obs_veh_vin: '9BHCP51CANP222579',
        obs_grp_codigo: 1,//this.grupo.grp_codigo,
        obs_dan_codigo: 1,//this.dano.dan_codigo,
        obs_tam_codigo: 1,//this.tamano.tam_codigo,
        obs_par_codigo: 1,//this.parte.par_codigo,
        obs_pos_x: this.ejex,
        obs_pos_y: this.ejey,
        file: this.fileList,
        fotos: this.listFoto
      }
  
      console.log('item observacion');
      console.log(observacion);
      
  
      this.listObservacionVin = [...this.listObservacionVin, observacion]
  
      this.observacionForm.reset()
      this.fileList = []
      this.listFoto = []
  

    //}else{
      //this.msg.warning('Tiene que seleccionar Daños y Tamanño')
    //}

    
    
  }


  quitarVinObs(item: any){

 
    this.listObservacionVin = this.listObservacionVin.filter((obs) => obs.cod_observacion !== item)    
    console.log('listado qiotado');
    console.log(this.listObservacionVin);

  }



  saveObservacionVin(){

    console.log(this.listObservacionVin);

    if(this.listObservacionVin.length>0){

      this.isLoadinCreateObs = true

      const formData = new FormData();
      var j=0
      
      this.listObservacionVin.forEach((item: any) => {
      
        console.log(item);
        
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

      this.serviceObservacion.createObservacionVin(formData).subscribe({
        next: (response) => {

          console.log('creaciondo detalle von observacion');
          console.log(response);
          
          if(response == true){
            this.isLoadinCreateObs = false
            this.fileList = []
            this.listFoto = []
            this.msg.success('Observaciones de Vin Realizadas');
            this.listObservacionVin = []   
            
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

  deleteItemFoto(itemFoto: any){

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
    this.indexList = this.listPartes[0]
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


}
