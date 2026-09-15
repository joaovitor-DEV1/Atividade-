+-------------------+       +-----------------------+       +-------------------+
|     USUARIOS      |       |     MOVIMENTACOES     |       |     PRODUTOS      |
+-------------------+       +-----------------------+       +-------------------+
| PK id_usuario     | 1   N | PK id_movimentacao    | N   1 | PK id_produto     |
|    nome           |<------| FK id_usuario         |------>|    nome           |
|    email          |       | FK id_produto         |       |    categoria      |
|    senha          |       |    tipo_movimentacao  |       |    especificacao  |
+-------------------+       |    quantidade         |       |    quantidade_atual|
                            |    data_movimentacao  |       |    estoque_minimo |
                            +-----------------------+       +-------------------+