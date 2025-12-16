import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
    selector: 'app-excluir-pensamento',
    templateUrl: './excluir-pensamento.component.html',
    styleUrls: ['./excluir-pensamento.component.css'],
    standalone: false
})
export class ExcluirPensamentoComponent implements OnInit {

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

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento
    })
  }

  excluirPensamento() {
    if(this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/criarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/criarPensamento'])
  }

}
