import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAsincronasComponent } from './consulta-asincronas.component';

describe('ConsultaAsincronasComponent', () => {
  let component: ConsultaAsincronasComponent;
  let fixture: ComponentFixture<ConsultaAsincronasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAsincronasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAsincronasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
