import { Component, OnInit } from '@angular/core';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';

@Component({
    selector: 'app-criar-pensamento',
    templateUrl: './criar-pensamento.component.html',
    styleUrls: ['./criar-pensamento.component.css'],
    standalone: false
})
export class CriarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    const hoje = this.zerarHora(new Date());

    this.service.listar().subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos.map(p => {
        const prazoFinal = this.converterParaData(p.prazofinal);
        const falta = Math.floor(this.calcularDiasUteis(hoje, prazoFinal));
        return { ...p, falta };
      });
      this.ordenarPorPrazoFinalDesc();
    });
  }

  ordenarPorPrazoFinalDesc(): void {
    this.listaPensamentos.sort((a, b) => {
      const dataA = this.converterParaData(a.prazofinal);
      const dataB = this.converterParaData(b.prazofinal);
      return dataB.getTime() - dataA.getTime();
    });
  }

  converterParaData(dataStr: string | undefined | null): Date {
    // Se a data for nula, indefinida ou vazia, retorna 01/01/2000
    if (!dataStr || dataStr.trim() === '') {
      return new Date(2000, 0, 1); // Janeiro é 0 no JavaScript
    }
    
    try {
      const [dia, mes, ano] = dataStr.split('/').map(Number);
      return new Date(ano, mes - 1, dia);
    } catch (e) {
      console.error(`Erro ao converter data: ${dataStr}`, e);
      return new Date(2000, 0, 1); // Retorna 01/01/2000 em caso de erro
    }
  }

  calcularDiasUteis(inicio: Date, fim: Date): number {
    let diasUteis = 0;
    const feriados = this.obterFeriados(inicio.getFullYear());
    
    // Garantir que as horas estão zeradas para comparação correta
    inicio = this.zerarHora(inicio);
    fim = this.zerarHora(fim);
  
    const invertido = fim < inicio;
    const dataInicio = new Date(invertido ? fim : inicio);
    const dataFim = new Date(invertido ? inicio : fim);
  
    while (dataInicio <= dataFim) {
      if (!this.ehFimDeSemana(dataInicio) && !this.ehFeriado(dataInicio, feriados)) {
        diasUteis++;
      }
      dataInicio.setDate(dataInicio.getDate() + 1);
    }
  
    return invertido ? -diasUteis : diasUteis;
  }
  

  zerarHora(data: Date): Date {
    const nova = new Date(data);
    nova.setHours(0, 0, 0, 0);
    return nova;
  }

  ehFimDeSemana(data: Date): boolean {
    const diaSemana = data.getDay();
    return diaSemana === 0 || diaSemana === 6;
  }

  ehFeriado(data: Date, feriados: string[]): boolean {
    return feriados.includes(this.formatarDiaMes(data));
  }

  formatarDiaMes(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    return `${dia}/${mes}`;
  }

  obterFeriados(ano: number): string[] {
    return [
      "01/01", "21/04", "01/05", "07/09",
      "12/10", "02/11", "15/11", "25/12"
    ];
  }

  formatarDataAtual(): string {
    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  renderDataHoje(): void {
    const dateEl = document.querySelector('.date');
    if (dateEl) {
      dateEl.innerHTML = this.formatarDataAtual();
    }
  }
}
