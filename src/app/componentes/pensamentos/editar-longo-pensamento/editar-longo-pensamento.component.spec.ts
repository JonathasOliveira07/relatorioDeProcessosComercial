import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLongoPensamentoComponent } from './editar-longo-pensamento.component';

describe('EditarLongoPensamentoComponent', () => {
  let component: EditarLongoPensamentoComponent;
  let fixture: ComponentFixture<EditarLongoPensamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLongoPensamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLongoPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
