import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
    selector: 'app-listar-pensamento',
    templateUrl: './listar-pensamento.component.html',
    styleUrls: ['./listar-pensamento.component.css'],
    standalone: false
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
      this.ordenar();
    });
  }

  ordenar() {
    this.listaPensamentos.sort((a, b) => {
      const dataA = this.stringParaData(a.prazofinal);
      const dataB = this.stringParaData(b.prazofinal);
      return dataB.getTime() - dataA.getTime(); // Ordem decrescente
    });
  }

  private stringParaData(dataStr: string): Date {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia); // mês começa em 0
  }

}
