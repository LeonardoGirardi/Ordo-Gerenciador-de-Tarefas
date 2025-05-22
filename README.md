


# 🗂️  ORDO - Sistema de Gerenciamento de Tarefas

## 📘 Introdução

O sistema de gerenciamento de tarefas é uma aplicação web desenvolvida com Angular no frontend e Express.js no backend. Seu objetivo é oferecer uma interface moderna, intuitiva e responsiva para usuários organizarem suas tarefas de forma prática e eficiente. Inspirado em ferramentas como Trello e Google Agenda, o sistema proporciona tanto uma visualização estilo kanban quanto uma agenda por datas, permitindo o gerenciamento completo do fluxo de trabalho pessoal ou profissional.

---

## ✅ Escopo Funcional

- **Cadastro e autenticação de usuários**
  - Registro, login e logout
  - Proteção de rotas por autenticação

- **Gestão de tarefas**
  - Criação, leitura, atualização e exclusão (CRUD)
  - Atribuição de título, descrição, data e status (A Fazer, Em Progresso, Concluído)
  - Associação de tarefas ao usuário logado

- **Interface estilo Kanban**
  - Colunas dinâmicas com arrastar e soltar (drag-and-drop)
  - Atualização automática do status da tarefa ao mover

- **Visualização por calendário**
  - Exibição de tarefas por dia, semana ou mês
  - Acesso direto a detalhes de tarefas pela interface do calendário

- **Filtros e busca**
  - Pesquisa de tarefas por título
  - Filtros por data e status

- **Responsividade**
  - Adaptação da interface para diferentes tamanhos de tela (desktop, tablet)

- **Deploy**
  - Publicação do frontend e backend em servidores gratuitos para acesso online

---

## 🚫 Exclusões de Escopo

- Colaboração entre múltiplos usuários em uma mesma conta
- Notificações por email ou push
- Criação de sub-tarefas ou checklists
- Integração com outras ferramentas (como Google Calendar ou Trello)
- Upload de arquivos ou anexos
- Painel administrativo com controle de usuários

---

## ⚙️ Escopo Não Funcional

- **Segurança**
  - Armazenamento seguro de senhas com criptografia
  - Autenticação via JWT para proteger endpoints privados

- **Performance**
  - Respostas rápidas da API com baixo tempo de latência

- **Escalabilidade**
  - Estrutura pensada para fácil evolução futura, com separação clara entre frontend e backend

- **Manutenibilidade**
  - Código modular e bem estruturado, com boas práticas de organização e nomenclatura

- **Usabilidade**
  - Interface amigável e intuitiva, baseada em Material Design
  - Fluxos de uso simples, com feedback visual claro para ações do usuário
"""as
