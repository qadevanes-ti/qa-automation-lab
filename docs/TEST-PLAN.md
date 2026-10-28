# Plano de testes

## Estratégia

Testes E2E funcionais pela interface real do SauceDemo. Cada caso inicia em contexto limpo; catálogo e preço são dados conhecidos do ambiente de demonstração. Identificadores permitem rastrear cenários até o relatório.

| ID      | Comportamento esperado                                      | Prioridade   |
| ------- | ----------------------------------------------------------- | ------------ |
| AUTH-01 | Usuário válido vê seis produtos                             | Alta / smoke |
| AUTH-02 | Credenciais inválidas exibem erro                           | Alta         |
| AUTH-03 | Usuário bloqueado recebe mensagem específica                | Alta         |
| AUTH-04 | Usuário vazio é rejeitado                                   | Média        |
| AUTH-05 | Senha vazia é rejeitada                                     | Média        |
| AUTH-06 | Logout encerra sessão e impede acesso direto ao catálogo    | Alta         |
| CAT-01  | Ordenação de nomes de Z a A                                 | Média        |
| CAT-02  | Ordenação de preços do menor ao maior                       | Média        |
| CART-01 | Adição preserva nome, preço e quantidade                    | Alta / smoke |
| CART-02 | Remoção esvazia carrinho e remove badge                     | Alta         |
| CHK-01  | Compra apresenta subtotal 29.99, imposto 2.40 e total 32.39 | Alta / smoke |
| CHK-02  | Primeiro nome obrigatório                                   | Média        |
| CHK-03  | Sobrenome obrigatório                                       | Média        |
| CHK-04  | Código postal obrigatório                                   | Média        |
| CAT-03  | Ordenação de preços do maior ao menor                       | Média        |
| CAT-04  | Restaura ordenação de A a Z                                 | Média        |
| CART-03 | Preserva nome, preço e badge após recarregar                | Alta         |
| CART-04 | Remoção seletiva preserva o segundo produto                 | Alta         |
| CHK-05  | Cancelamento do formulário preserva carrinho                | Alta         |
| CHK-06  | Cancelamento da revisão preserva produto                    | Alta         |
| CHK-07  | Compra de dois produtos soma 39.98 + 3.20 = 43.18           | Alta         |

## Critério de conclusão

Tipos válidos e todos os testes selecionados aprovados. Na execução completa, são 63 combinações de cenário/navegador. Falha por indisponibilidade externa também falha a execução e deve ser diagnosticada, sem ser convertida automaticamente em aprovação.

## Riscos e lacunas

Catálogo e mensagens pertencem a uma aplicação externa. O teste deve ser revisado quando o comportamento esperado mudar. Não verifica estoque real, pagamento, entrega, APIs, desempenho ou acessibilidade. Valores de imposto são a regra observada neste ambiente, não uma regra fiscal geral.
