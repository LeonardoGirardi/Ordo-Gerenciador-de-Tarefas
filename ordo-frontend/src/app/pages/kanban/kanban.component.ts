import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  tarefasAFazer = [
    { titulo: 'Estudar Angular', descricao: 'Assistir aula 5 e 6' },
    { titulo: 'Criar layout Kanban', descricao: 'Finalizar HTML e CSS' }
  ];

  tarefasEmProgresso = [
    { titulo: 'Documentar projeto', descricao: 'Adicionar seções no README' }
  ];

  tarefasConcluidas = [
    { titulo: 'Configurar Navbar', descricao: 'Navbar com perfil e sair' }
  ];
}
