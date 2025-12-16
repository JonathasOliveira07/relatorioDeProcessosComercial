import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento!: Pensamento;
  pensamentoOriginal!: Pensamento;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(parseInt(id)).subscribe((pensamento) => {
        this.pensamento = { ...pensamento };
        this.pensamentoOriginal = { ...pensamento };
      });
    }
  }

  calcularDiasRestantes(prazofinal: string): number {
    const [dia, mes, ano] = prazofinal.split('/').map(Number);
    const dataFinal = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataFinal.setHours(0, 0, 0, 0);
    const diffMs = dataFinal.getTime() - hoje.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  editarPensamento() {
    // Só modifica se os campos foram alterados (e não estão vazios)
    if (
      this.pensamento.ultimoandamento &&
      this.pensamento.ultimoandamento !== this.pensamentoOriginal.ultimoandamento
    ) {
      this.pensamento.ultimoandamento = this.pensamento.ultimoandamento.trim();
    } else {
      this.pensamento.ultimoandamento = this.pensamentoOriginal.ultimoandamento;
    }

    if (
      this.pensamento.andamento &&
      this.pensamento.andamento !== this.pensamentoOriginal.andamento
    ) {
      this.pensamento.andamento = this.pensamento.andamento.trim();
    } else {
      this.pensamento.andamento = this.pensamentoOriginal.andamento;
    }

    if (
      this.pensamento.prazofinal &&
      this.pensamento.prazofinal !== this.pensamentoOriginal.prazofinal
    ) {
      this.pensamento.prazofinal = this.pensamento.prazofinal.trim();
    } else {
      this.pensamento.prazofinal = this.pensamentoOriginal.prazofinal;
    }

    // Atualiza pensamento.falta com diferença de dias
    this.pensamento.falta = this.calcularDiasRestantes(this.pensamento.prazofinal);

    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/criarPensamento']);
    });
  }

  cancelar() {
    this.router.navigate(['/criarPensamento']);
  }

}
