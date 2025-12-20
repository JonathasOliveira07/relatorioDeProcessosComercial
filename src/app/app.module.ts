import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';
import { PensamentoComponent } from './componentes/pensamentos/pensamento/pensamento.component';
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';
import { ImpressaoComponent } from './componentes/pensamentos/impressao/impressao.component';
import { DetalharPensamentoComponent } from './componentes/pensamentos/detalhar-pensamento/detalhar-pensamento.component';
import { EditarLongoPensamentoComponent } from './componentes/pensamentos/editar-longo-pensamento/editar-longo-pensamento.component';
import { AdicionarPensamentoComponent } from './componentes/pensamentos/adicionar-pensamento/adicionar-pensamento.component';
import { LoginComponent } from './componentes/login/login.component';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';



@NgModule({ declarations: [
        AppComponent,
        RodapeComponent,
        CriarPensamentoComponent,
        ListarPensamentoComponent,
        PensamentoComponent,
        ExcluirPensamentoComponent,
        EditarPensamentoComponent,
        ImpressaoComponent,
        DetalharPensamentoComponent,
        EditarLongoPensamentoComponent,
        AdicionarPensamentoComponent,
        LoginComponent,
        AppComponent,
        CabecalhoComponent

    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
