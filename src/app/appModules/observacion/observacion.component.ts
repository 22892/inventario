import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {FormBuilder,FormControl,FormGroup,ValidationErrors,Validators,} from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';


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
  observacionForm!: FormGroup;
 

  constructor( private fb: FormBuilder,
    private msg: NzMessageService,) {

    this.observacionForm = this.fb.group({
      dov_observaciones_estado_fisico: ['', [Validators.required]],
      obs_tipo: [''],
    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('entra after------------<<<<<<<<<<<<<<<>>>>>>>>>>>>>------------');
    this.initLienzo()

  }

  
  initLienzo(){

   
    this.sigPadElement = this.sigPad.nativeElement
    this.context = this.sigPadElement.getContext('2d');
    var img = new Image();
    img.src = "../../../assets/carro.jpeg";
    img.height = 10
    img.width = 10
    this.context.drawImage(img, -10,-20, 400,400);
    let self = this;
    img.onload = function(){
      self.context.drawImage(img, -10,-20,400,400);
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


  saveObservacionVin(){

  }

  pestanaItem(index: any) {
  }

  checkObservacion(codigo: number){

  }

  beforeUpload = (file: any): any => {

  }

  deleteItemFoto(itemFoto: any){

  }

  limpiarLienzo() {
   
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any) {
    this.isDrawing = false;
  }


  private relativeCoords(event: any) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }


  onMouseDown(e: any) {
    this.isDrawing = true;
    //this.initLienzo()
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e: any) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);

      this.context.beginPath();
      this.context.fillStyle = 'red';
      this.context.strokeStyle = 'black';
      this.context.arc(coords.x, coords.y, 10, 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();
      //this.respaldoContext = this.context;

      var imageBase64String = this.sigPadElement.toDataURL(); // get the base64 string from the canvas context

      if (typeof localStorage !== 'undefined') {
        console.log('guarda..........');

        localStorage.setItem('canvas', imageBase64String);
      } else {
        console.log('nooooooooooooooooooo');
      }
    }
  }




}
