import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPensamentoComponent } from './adicionar-pensamento.component';

describe('AdicionarPensamentoComponent', () => {
  let component: AdicionarPensamentoComponent;
  let fixture: ComponentFixture<AdicionarPensamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarPensamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
