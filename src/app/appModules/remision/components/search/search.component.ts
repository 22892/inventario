import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { RemisionService } from '../../services/remision.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = new FormControl('')

  constructor(private serviceRemision: RemisionService) {
    this.search.valueChanges.pipe(
      map(search => search?.toUpperCase().trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search =! '' && search?.length > 2),
      tap(res => this.serviceRemision.filterDate(this.search))
    ).subscribe()
  }

  ngOnInit(): void {
  }

}
