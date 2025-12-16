import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from '../pensamento';

@Component({
    selector: 'app-detalhar-pensamento',
    templateUrl: './detalhar-pensamento.component.html',
    styleUrls: ['./detalhar-pensamento.component.css'],
    standalone: false
})
export class DetalharPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
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
  dataFormatada: string = '';

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(parseInt(id)).subscribe((pensamento) => {
        this.pensamento = pensamento;
        this.calcularDiasRestantes();
      });
    }
  }

  calcularDiasRestantes() {
    if (!this.pensamento?.prazofinal) return;

    const [dia, mes, ano] = this.pensamento.prazofinal.split('/').map(Number);
    const dataFinal = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    // Zera horas para evitar conflitos por fuso/horário de verão
    dataFinal.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    const diffMs = dataFinal.getTime() - hoje.getTime();
    this.diasRestantes = Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  formatarData(numero: number): string {
    const numeroStr = numero.toString();
    const ano = numeroStr.substring(0, 4);
    const mes = numeroStr.substring(4, 6);
    const dia = numeroStr.substring(6, 8);
    this.dataFormatada = `${dia}/${mes}/${ano}`;
    return this.dataFormatada;
  }
}
