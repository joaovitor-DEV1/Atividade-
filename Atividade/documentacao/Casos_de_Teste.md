# ENTREGA 08 – Descritivo de Casos de Teste de Software

## 8.1 Ferramentas e Ambientes de Teste
- **Sistemas Operacionais:** Windows 11 Pro 64-bits / Linux Ubuntu 22.04 LTS.
- **Navegadores:** Google Chrome (v120+), Mozilla Firefox (v120+), Microsoft Edge.
- **Ferramentas de Desenvolvimento e Execução:** Visual Studio Code, VS Code Live Server, DevTools do Navegador (Console e Inspection).
- **Banco de Dados:** MySQL Server 8.0 / MySQL Workbench.

---

## 8.2 Casos de Teste de Software

| ID Caso | Requisito Relacionado | Tipo de Teste | Descrição / Pré-condição | Passos para Execução | Resultado Esperado |
|---|---|---|---|---|---|
| **CT-01** | RF01 | Funcional | Login com credenciais inválidas. | 1. Acessar a tela de login.<br>2. Digitar e-mail ou senha incorretos.<br>3. Clicar em "Entrar no Sistema". | Exibe mensagem de alerta de erro e mantém o usuário na tela de login. |
| **CT-02** | RF01 | Funcional | Login com credenciais válidas. | 1. Digitar e-mail e senha corretos.<br>2. Clicar em "Entrar no Sistema". | Redireciona para o Painel Principal com sucesso. |
| **CT-03** | RF02 | Funcional | Exibição do usuário e Logout. | 1. Estar autenticado no sistema.<br>2. Verificar o topo da página.<br>3. Clicar no botão "Sair (Logout)". | Exibe o nome do usuário logado e, ao clicar em Sair, encerra a sessão e redireciona para a tela de login. |
| **CT-04** | RF03 / RF07 | Validação | Cadastro de produto com campos em branco. | 1. Acessar "Cadastro de Produtos".<br>2. Deixar campos obrigatórios vazios.<br>3. Clicar em "Salvar Produto". | O sistema bloqueia o envio e exibe um alerta solicitando o preenchimento de todos os campos. |
| **CT-05** | RF03 / RF04 | Funcional | Cadastro e listagem de novo produto. | 1. Preencher todos os campos do produto.<br>2. Clicar em "Salvar Produto". | O produto é gravado e passa a ser exibido automaticamente na tabela da página. |
| **CT-06** | RF05 | Funcional | Campo de busca/filtro na tabela. | 1. Possuir produtos cadastrados.<br>2. Digitar um termo de busca no campo "Buscar produto". | A tabela é filtrada em tempo real exibindo apenas os itens correspondentes ao termo. |
| **CT-07** | RF06 | Funcional | Edição de produto existente. | 1. Clicar no botão "Editar" em um produto.<br>2. Alterar o nome/quantidade.<br>3. Clicar em "Salvar Produto". | Os dados do produto são atualizados corretamente na tabela e no banco. |
| **CT-08** | RF06 | Funcional | Exclusão de produto. | 1. Clicar em "Excluir" em um produto.<br>2. Confirmar a mensagem de exclusão. | O registro é removido permanentemente da tabela e da base de dados. |
| **CT-09** | RF08 / RF09 | Funcional | Listagem ordenada na Gestão de Estoque. | 1. Acessar a tela de "Gestão de Estoque".<br>2. Abrir o seletor de produtos. | A lista de produtos é apresentada em ordem alfabética (A-Z) via algoritmo QuickSort. |
| **CT-10** | RF08 / RF10 | Regra de Negócio | Movimentação de Saída e Alerta de Estoque Mínimo. | 1. Selecionar um produto com estoque próximo ao mínimo.<br>2. Selecionar "SAÍDA" e informar quantidade suficiente para ficar abaixo do mínimo.<br>3. Registrar a movimentação. | Atualiza o saldo do estoque, registra no histórico e emite um ALERTA VISUAL AUTOMÁTICO de estoque crítico. |