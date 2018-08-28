import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPeriodicasComponent } from './consulta-periodicas.component';

describe('ConsultaPeriodicasComponent', () => {
  let component: ConsultaPeriodicasComponent;
  let fixture: ComponentFixture<ConsultaPeriodicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPeriodicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPeriodicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
