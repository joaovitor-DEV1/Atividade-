# ENTREGA 01 – Requisitos Funcionais

## Visão Geral do Sistema
Sistema Web para Gestão de Estoque e Almoxarifado em Indústria de Embalagens.

## Lista de Requisitos Funcionais (RF)

| ID | Nome do Requisito | Descrição Detalhada |
|---|---|---|
| **RF01** | Autenticação de Usuários | O sistema deve permitir o login do usuário com e-mail e senha. Em caso de credenciais inválidas, deve exibir mensagem de falha e manter/redirecionar o usuário na tela de login. |
| **RF02** | Gestão de Sessão (Logout) | O sistema deve exibir o nome do usuário autenticado no painel principal e fornecer a funcionalidade de encerrar a sessão (logout), redirecionando para a tela de autenticação. |
| **RF03** | Cadastro de Produtos | O sistema deve permitir o cadastro de novos produtos no almoxarifado (ex: caixas de papelão com dimensões/gramaturas e frascos plásticos com capacidade/tampa), incluindo quantidade atual e estoque mínimo. |
| **RF04** | Listagem e Visualização | O sistema deve listar automaticamente todos os produtos cadastrados em uma tabela logo ao acessar a tela de cadastro. |
| **RF05** | Consulta e Filtro de Produtos | O sistema deve oferecer um campo de busca por texto que filtre em tempo real os registros da tabela correspondentes ao termo digitado. |
| **RF06** | Edição e Exclusão de Produtos | O sistema deve disponibilizar botões/mecanismos para alterar os dados de um produto existente ou removê-lo do banco de dados. |
| **RF07** | Validação de Formulários | O sistema deve validar todos os campos de inserção/edição, exibindo alertas ao usuário em caso de campos vazios ou formatos inválidos. |
| **RF08** | Movimentação de Estoque | O sistema deve permitir selecionar um produto e registrar movimentações do tipo ENTRADA ou SAÍDA, especificando a quantidade e a data da operação. |
| **RF09** | Ordenação de Produtos | A listagem da tela de Gestão de Estoque deve apresentar os produtos ordenados alfabeticamente utilizando um algoritmo de ordenação (ex: QuickSort). |
| **RF10** | Alerta de Estoque Mínimo | A cada movimentação de SAÍDA, o sistema deve verificar se a quantidade restante ficará abaixo do estoque mínimo pré-configurado e emitir um alerta automático visual imediato. |