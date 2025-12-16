import { Pensamento } from './../pensamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    palavrachave: '',
    processoprotocolo: '',
    varaserventia: '',
    nomeDaEmpresa: '',
    polo: '',
    datadadistribuicao: '',
    acao: '',
    partecontraria: '',
    empreendimento: '',
    custasjudiciais: '',
    valordacausa: '',
    prazofinal: '',
    audiencia: '',
    andamento: '',
    datadadistribuicao2: '',
    ultimoandamento: '',
    hoje: '',
    falta: 0
  };

  diasRestantes: number = 0;
  dataFormatada: string = '';

  constructor() {}

  ngOnInit(): void {
    this.calcularDiasRestantes();
    this.dataFormatada = this.pensamento.prazofinal; // já está no formato DD/MM/AAAA
  }

  calcularDiasRestantes(): void {
    if (!this.pensamento?.prazofinal) return;

    const [dia, mes, ano] = this.pensamento.prazofinal.split('/').map(Number);
    const dataFinal = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    // Zera as horas para evitar discrepâncias por horário
    dataFinal.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    const diffMs = dataFinal.getTime() - hoje.getTime();
    this.diasRestantes = Math.round(diffMs / (1000 * 60 * 60 * 24));
  }
}
