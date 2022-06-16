import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaestadosComponent } from './tablaestados.component';

describe('TablaestadosComponent', () => {
  let component: TablaestadosComponent;
  let fixture: ComponentFixture<TablaestadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaestadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
