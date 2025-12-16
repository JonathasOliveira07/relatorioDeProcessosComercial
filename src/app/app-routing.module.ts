import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';
import { DetalharPensamentoComponent } from './componentes/pensamentos/detalhar-pensamento/detalhar-pensamento.component';
import { EditarLongoPensamentoComponent } from './componentes/pensamentos/editar-longo-pensamento/editar-longo-pensamento.component';
import { AdicionarPensamentoComponent } from './componentes/pensamentos/adicionar-pensamento/adicionar-pensamento.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'criarPensamento',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'criarPensamento',
    component: CriarPensamentoComponent
  },
  {
    path: 'adicionarPensamento',
    component: AdicionarPensamentoComponent
  },
  {
    path: 'listarPensamento',
    component: ListarPensamentoComponent
  },
  {
    path: 'pensamentos/excluirPensamento/:id',
    component: ExcluirPensamentoComponent
  },
  {
    path: 'pensamentos/editarPensamento/:id',
    component: EditarPensamentoComponent
  },
  {
    path: 'pensamentos/editarLongo/Pensamento/:id',
    component: EditarLongoPensamentoComponent
  },
  {
    path: 'pensamentos/detalharPensamento/:id',
    component: DetalharPensamentoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
