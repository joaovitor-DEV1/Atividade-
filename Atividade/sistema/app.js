// Base de dados local simulada (inicializada conforme requisitos)
let currentUser = null;

let database = {
    usuarios: [
        { id: 1, nome: "Carlos Operador", email: "admin@embalagens.com", senha: "123" },
        { id: 2, nome: "Ana Almoxarife", email: "ana@embalagens.com", senha: "123" }
    ],
    produtos: [
        { id: 1, nome: "Caixa de Papelão Dupla", categoria: "Papelão", especificacao: "Gramatura 450g/m² - 40x30x25cm", quantidade: 150, estoqueMinimo: 50 },
        { id: 2, nome: "Frasco Plástico PET 500ml", categoria: "Frasco Plástico", especificacao: "Capacidade 500ml - Tampa Rosca", quantidade: 20, estoqueMinimo: 30 },
        { id: 3, nome: "Caixa KRAFT Mini", categoria: "Papelão", especificacao: "Gramatura 300g/m² - 15x15x10cm", quantidade: 200, estoqueMinimo: 40 }
    ],
    movimentacoes: []
};

// --- NAVEGAÇÃO E AUTENTICAÇÃO ---
document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value.trim();
    const alertBox = document.getElementById('login-alert');

    const user = database.usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
        currentUser = user;
        document.getElementById('user-display-name').innerText = user.nome;
        alertBox.classList.add('hidden');
        document.getElementById('screen-login').classList.remove('active');
        document.getElementById('screen-login').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        navigateTo('screen-main');
    } else {
        // Exibe erro e mantém na tela de autenticação (Item 4.1)
        alertBox.innerText = "Falha na Autenticação: E-mail ou senha incorretos.";
        alertBox.className = "alert alert-danger";
        alertBox.classList.remove('hidden');
    }
});

document.getElementById('btn-logout').addEventListener('click', function() {
    currentUser = null;
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('screen-login').classList.remove('hidden');
    document.getElementById('screen-login').classList.add('active');
    document.getElementById('login-email').value = '';
    document.getElementById('login-senha').value = '';
});

function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'screen-cadastro') loadProductTable();
    if (screenId === 'screen-gestao') loadStockManagement();
}

// --- ITEM 6: CADASTRO E GERENCIAMENTO DE PRODUTOS ---
function loadProductTable(productsToRender = database.produtos) {
    const tbody = document.getElementById('table-products-body');
    tbody.innerHTML = '';

    productsToRender.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.categoria}</td>
            <td>${p.especificacao}</td>
            <td>${p.quantidade} ${p.quantidade < p.estoqueMinimo ? '<span class="badge-danger">CRÍTICO</span>' : ''}</td>
            <td>${p.estoqueMinimo}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${p.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Filtro de Busca (Item 6.1.2)
function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = database.produtos.filter(p => 
        p.nome.toLowerCase().includes(term) || 
        p.categoria.toLowerCase().includes(term) || 
        p.especificacao.toLowerCase().includes(term)
    );
    loadProductTable(filtered);
}

// Salvar / Alterar Produto com Validação (Item 6.1.3, 6.1.4, 6.1.6)
document.getElementById('form-produto').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('prod-id').value;
    const nome = document.getElementById('prod-nome').value.trim();
    const categoria = document.getElementById('prod-categoria').value;
    const especificacao = document.getElementById('prod-especificacao').value.trim();
    const quantidade = parseInt(document.getElementById('prod-qtd').value);
    const estoqueMinimo = parseInt(document.getElementById('prod-min').value);

    // Validação de campos
    if (!nome || !categoria || !especificacao || isNaN(quantidade) || isNaN(estoqueMinimo)) {
        alert("ALERTA DE VALIDAÇÃO: Todos os campos devem ser preenchidos corretamente!");
        return;
    }

    if (id) {
        // Edição
        const index = database.produtos.findIndex(p => p.id == id);
        database.produtos[index] = { id: parseInt(id), nome, categoria, especificacao, quantidade, estoqueMinimo };
        alert("Produto atualizado com sucesso!");
    } else {
        // Novo Cadastro
        const newId = database.produtos.length > 0 ? Math.max(...database.produtos.map(p => p.id)) + 1 : 1;
        database.produtos.push({ id: newId, nome, categoria, especificacao, quantidade, estoqueMinimo });
        alert("Produto cadastrado com sucesso!");
    }

    resetProductForm();
    loadProductTable();
});

function editProduct(id) {
    const p = database.produtos.find(prod => prod.id === id);
    document.getElementById('prod-id').value = p.id;
    document.getElementById('prod-nome').value = p.nome;
    document.getElementById('prod-categoria').value = p.categoria;
    document.getElementById('prod-especificacao').value = p.especificacao;
    document.getElementById('prod-qtd').value = p.quantidade;
    document.getElementById('prod-min').value = p.estoqueMinimo;

    document.getElementById('form-product-title').innerText = "Editar Produto #" + p.id;
    document.getElementById('btn-cancel-edit').classList.remove('hidden');
}

function deleteProduct(id) {
    if (confirm("Tem certeza que deseja excluir o produto #" + id + "?")) {
        database.produtos = database.produtos.filter(p => p.id !== id);
        loadProductTable();
    }
}

function resetProductForm() {
    document.getElementById('form-produto').reset();
    document.getElementById('prod-id').value = '';
    document.getElementById('form-product-title').innerText = "Cadastrar Novo Produto";
    document.getElementById('btn-cancel-edit').classList.add('hidden');
}

// --- ITEM 7: GESTÃO DE ESTOQUE E ALGORITMO DE ORDENAÇÃO ---

// Algoritmo de Ordenação QuickSort para Ordem Alfabética (Item 7.1.1)
function quickSortAlphabetical(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].nome.localeCompare(pivot.nome, 'pt-BR') < 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSortAlphabetical(left), pivot, ...quickSortAlphabetical(right)];
}

function loadStockManagement() {
    // Aplica o algoritmo de ordenação QuickSort
    const sortedProducts = quickSortAlphabetical([...database.produtos]);

    const select = document.getElementById('mov-produto-id');
    select.innerHTML = '<option value="">Selecione um produto...</option>';
    sortedProducts.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.nome} (Atual: ${p.quantidade} | Mín: ${p.estoqueMinimo})</option>`;
    });

    // Ajusta a data atual padrão
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('mov-data').value = now.toISOString().slice(0, 16);

    loadHistoryTable();
}

// Registro de Movimentação e Alerta Automático (Item 7.1.4)
document.getElementById('form-movimentacao').addEventListener('submit', function(e) {
    e.preventDefault();
    const prodId = parseInt(document.getElementById('mov-produto-id').value);
    const tipo = document.getElementById('mov-tipo').value;
    const qtd = parseInt(document.getElementById('mov-qtd').value);
    const dataHora = document.getElementById('mov-data').value;
    const alertBox = document.getElementById('stock-alert-container');
    alertBox.innerHTML = '';

    const product = database.produtos.find(p => p.id === prodId);

    if (tipo === 'SAIDA') {
        if (qtd > product.quantidade) {
            alert("ERRO: Quantidade de saída maior que a quantidade disponível em estoque!");
            return;
        }
        product.quantidade -= qtd;

        // Verificação e Alerta Automático de Estoque Mínimo (Item 7.1.4)
        if (product.quantidade < product.estoqueMinimo) {
            alertBox.innerHTML = `
                <div class="alert alert-warning">
                    ⚠️ <strong>ALERTA DE ESTOQUE MÍNIMO:</strong> O produto "<strong>${product.nome}</strong>" ficou abaixo do estoque mínimo pré-configurado! (Estoque Atual: ${product.quantidade} | Mínimo: ${product.estoqueMinimo})
                </div>
            `;
        }
    } else {
        product.quantidade += qtd;
    }

    // Registro do Histórico com Responsável (Rastreabilidade)
    database.movimentacoes.unshift({
        data: new Date(dataHora).toLocaleString('pt-BR'),
        produto: product.nome,
        tipo: tipo,
        qtd: qtd,
        usuario: currentUser.nome
    });

    alert("Movimentação registrada com sucesso!");
    document.getElementById('mov-qtd').value = '';
    loadStockManagement();
});

function loadHistoryTable() {
    const tbody = document.getElementById('table-history-body');
    tbody.innerHTML = '';
    database.movimentacoes.forEach(m => {
        tbody.innerHTML += `
            <tr>
                <td>${m.data}</td>
                <td>${m.produto}</td>
                <td><strong style="color: ${m.tipo === 'ENTRADA' ? 'green' : 'red'};">${m.tipo}</strong></td>
                <td>${m.qtd}</td>
                <td>${m.usuario}</td>
            </tr>
        `;
    });
}