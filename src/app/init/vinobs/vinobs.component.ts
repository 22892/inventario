import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-vinobs',
  templateUrl: './vinobs.component.html',
  styleUrls: ['./vinobs.component.scss']
})
export class VinobsComponent implements OnInit, AfterViewInit {

  @ViewChild('sigPad', { static: false }) sigPad: any;
  sigPadElement: any;
  context: any;
  respaldoContext: any
  isDrawing = false;


  ancho: any = 0
  alto: any = 0
  ejex: any
  ejey: any
  ejeYOpe: any = 0
  ejeXOpe: any = 0


  windowWidth = window.innerWidth;
  windowHeight =  document.documentElement.scrollHeight;




  constructor() { }

  ngOnInit(): void {

    this.ancho = this.porcentaje(40)
    this.alto = this.ancho / 1.4036

  }

  ngAfterViewInit(): void {
    this.initLienzo()
  }

  porcentaje(porcen: any){
    return (this.windowWidth * porcen) / 100
  }


  private relativeCoords(event: any) {

    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
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



  onMouseDown(e: any) {
    
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }


  onMouseMove(e: any) {
    
    console.log('qqqqqqqqqqqqqq');
    

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

      }, 50);
    }
  }




}
