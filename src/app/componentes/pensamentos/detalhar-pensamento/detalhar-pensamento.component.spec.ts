import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharPensamentoComponent } from './detalhar-pensamento.component';

describe('DetalharPensamentoComponent', () => {
  let component: DetalharPensamentoComponent;
  let fixture: ComponentFixture<DetalharPensamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharPensamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
