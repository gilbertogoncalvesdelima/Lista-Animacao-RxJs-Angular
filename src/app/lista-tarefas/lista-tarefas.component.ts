import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { TarefaService } from 'src/app/service/tarefa.service';
import { Tarefa } from '../interface/tarefa';
import { checkButtonTrigger, filterTrigger, formButtonTrigger, highlightedStateTrigger, shakeTrigger, shownStateTrigger } from '../animations';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css'],
  animations: [
    highlightedStateTrigger,
    shownStateTrigger,
    checkButtonTrigger,
    filterTrigger,
    formButtonTrigger,
    shakeTrigger
  ]
})

export class ListaTarefasComponent implements OnInit {
  listaTarefas: Tarefa[] = [];
  // true, ja fique com o furmulario aberto
  formAberto: boolean = false;
  categoria: string = '';
  validado: boolean = false;
  indexTarefa: number = -1;
  id: number = 0;
  campoBusca: string = '';
  // foi criado um agtributo tarefasFiltradas, array resultante da busca, inicializando o array vazio
  tarefasFiltradas: Tarefa[] = [];

  formulario: FormGroup = this.fomBuilder.group({
    id: [0],
    descricao: ['', Validators.required],
    statusFinalizado: [false, Validators.required],
    categoria: ['Casa', Validators.required],
    prioridade: ['Alta', Validators.required],
  });

  constructor(
    private service: TarefaService,
    private router: Router,
    private fomBuilder: FormBuilder
  ) {}

  ngOnInit(): Tarefa[] {
    this.service.listar(this.categoria).subscribe((listaTarefas) => {
      this.listaTarefas = listaTarefas;
      this.tarefasFiltradas = listaTarefas;
    });
    return this.tarefasFiltradas;
  }

  filtrarTarefasPorDescricao(descricao: string) {
    // trim para remover os espaços e toLocaleLowerCase, para deixar as letras minusculas
   this.campoBusca = descricao.trim().toLocaleLowerCase()
  //   Se a pessoa digitou alguma coisa no campo de busca, eu irei poopular o array de tarefas filtradas
   if(descricao) {
    // para saber se o termo que digito vai da certo com a tarefa que ja existe com a descrição vamos utilizar o metodo includes
    this.tarefasFiltradas = this.listaTarefas.filter(tarefa => tarefa.descricao.toLocaleLowerCase().includes(this.campoBusca))
   } else {
    // array tarefasFiltradas irá receber a listaTarefas
    this.tarefasFiltradas = this.listaTarefas
   }
  }

  mostrarOuEsconderFormulario() {
    this.formAberto = !this.formAberto;
    this.resetarFormulario();
  }

  salvarTarefa() {
    if (this.formulario.value.id) {
      this.editarTarefa();
    } else {
      this.criarTarefa();
    }
  }

  editarTarefa() {
    this.service.editar(this.formulario.value).subscribe({
      complete: () => this.atualizarComponente(),
    });
  }

  criarTarefa() {
    this.service.criar(this.formulario.value).subscribe({
      complete: () => this.atualizarComponente(),
    });
  }

  excluirTarefa(id: number) {
    if (id) {
      this.service.excluir(id).subscribe({
        complete: () => this.recarregarComponente(),
      });
    }
  }

  cancelar() {
    this.resetarFormulario();
    this.formAberto = false;
  }

  resetarFormulario() {
    this.formulario.reset({
      descricao: '',
      statusFinalizado: false,
      categoria: '',
      prioridade: '',
    });
  }

  recarregarComponente() {
    this.router.navigate(['/listaTarefas']);
  }

  atualizarComponente() {
    this.recarregarComponente();
    this.resetarFormulario();
  }

  carregarParaEditar(id: number) {
    this.service.buscarPorId(id!).subscribe((tarefa) => {
      this.formulario = this.fomBuilder.group({
        id: [tarefa.id],
        descricao: [tarefa.descricao],
        categoria: [tarefa.categoria],
        statusFinalizado: [tarefa.statusFinalizado],
        prioridade: [tarefa.prioridade],
      });
    });
    this.formAberto = true;
  }

  finalizarTarefa(id: number) {
    this.id = id
    this.service.buscarPorId(id!).subscribe((tarefa) => {
      this.service.atualizarStatusTarefa(tarefa).subscribe(() => {
        this.listarAposCheck();
      });
    });
  }

  listarAposCheck() {
    this.service.listar(this.categoria).subscribe((listaTarefas) => {
      this.tarefasFiltradas = listaTarefas;
    });
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  campoValidado(campoAtual: string): string {
    if (
      this.formulario.get(campoAtual)?.errors &&
      this.formulario.get(campoAtual)?.touched
    ) {
      this.validado = false;
      return 'form-tarefa input-invalido';
    } else {
      this.validado = true;
      return 'form-tarefa';
    }
  }
}
