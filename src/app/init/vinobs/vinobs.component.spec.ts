import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinobsComponent } from './vinobs.component';

describe('VinobsComponent', () => {
  let component: VinobsComponent;
  let fixture: ComponentFixture<VinobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
