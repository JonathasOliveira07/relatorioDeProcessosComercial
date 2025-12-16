import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-adicionar-pensamento',
    templateUrl: './adicionar-pensamento.component.html',
    styleUrls: ['./adicionar-pensamento.component.css'],
    standalone: false
})
export class AdicionarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
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

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) { // Adicione esta verificação
      this.service.buscarPorId(parseInt(id)).subscribe((pensamento) => {this.pensamento = pensamento
      })
    }
  }

  criarPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      this.router.navigate(['/criarPensamento'])
    })
  }

  enviarEmailPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      this.service.enviarEmail(this.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    });
  }
  

  cancelar() {
    this.router.navigate(['/criarPensamento'])
  }

}
