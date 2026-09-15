-- =======================================================
-- SCRIPT DE CRIAÇÃO E POPULAÇÃO DO BANCO DE DADOS
-- Banco de Dados: almoxarifado_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS almoxarifado_db;
USE almoxarifado_db;

-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- 2. Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    especificacao VARCHAR(200) NOT NULL,
    quantidade_atual INT NOT NULL DEFAULT 0,
    estoque_minimo INT NOT NULL DEFAULT 0
);

-- 3. Tabela de Movimentações de Estoque
CREATE TABLE IF NOT EXISTS movimentacoes (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimentacao ENUM('ENTRADA', 'SAIDA') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATETIME NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- =======================================================
-- POPULAÇÃO INICIAL (Mínimo de 3 registros por tabela)
-- =======================================================

-- Registros em USUARIOS
INSERT INTO usuarios (nome, email, senha) VALUES
('Carlos Operador', 'carlos@embalagens.com', 'senha123'),
('Ana Almoxarife', 'ana@embalagens.com', 'admin123'),
('Marcos Supervisor', 'marcos@embalagens.com', 'super2024');

-- Registros em PRODUTOS
INSERT INTO produtos (nome, categoria, especificacao, quantidade_atual, estoque_minimo) VALUES
('Caixa de Papelão Dupla', 'Papelão', 'Gramatura 450g/m² - Dimensões 40x30x25cm', 150, 50),
('Frasco Plástico PET 500ml', 'Frasco Plástico', 'Capacidade 500ml - Tampa Rosca 28mm', 20, 30),
('Caixa KRAFT Mini', 'Papelão', 'Gramatura 300g/m² - Dimensões 15x15x10cm', 200, 40);

-- Registros em MOVIMENTACOES
INSERT INTO movimentacoes (id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao) VALUES
(1, 1, 'ENTRADA', 100, '2024-03-01 08:30:00'),
(2, 2, 'SAIDA', 15, '2024-03-02 10:15:00'),
(3, 3, 'ENTRADA', 50, '2024-03-03 14:00:00');