import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from './../pensamento';

@Component({
  selector: 'app-impressao',
  templateUrl: './impressao.component.html',
  styleUrls: ['./impressao.component.css']
})
export class ImpressaoComponent implements OnInit {

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
  }

  diasRestantes: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calcularDiasRestantes();
  }

  calcularDiasRestantes() {
    if (!this.pensamento?.prazofinal) return;

    const [dia, mes, ano] = this.pensamento.prazofinal.split('/').map(Number);
    const dataFinal = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    // Zera horas para evitar problemas com horário de verão
    dataFinal.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    const diffMs = dataFinal.getTime() - hoje.getTime();
    this.diasRestantes = Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

}
