import { Component, OnInit } from '@angular/core';
import { SpinerService} from '../../core/spiner.service'

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent implements OnInit {

  isLoading$ = this.serviceSpiner.isLoading$

  constructor(private serviceSpiner: SpinerService ) { }

  ngOnInit(): void {
    console.log('lllammaa espinerrrrrrrrrrrrrrrr');
    console.log(this.isLoading$);
    
    
  }

}
