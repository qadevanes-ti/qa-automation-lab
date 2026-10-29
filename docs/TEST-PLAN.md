# Plano de testes

## Estratégia

Testes E2E funcionais pela interface real do SauceDemo. Cada caso inicia em contexto limpo; catálogo e preço são dados conhecidos do ambiente de demonstração. Identificadores permitem rastrear cenários até o relatório.

| ID        | Comportamento esperado                                            | Prioridade   |
| --------- | ----------------------------------------------------------------- | ------------ |
| AUTH-01   | Usuário válido vê seis produtos                                   | Alta / smoke |
| AUTH-02   | Credenciais inválidas exibem erro                                 | Alta         |
| AUTH-03   | Usuário bloqueado recebe mensagem específica                      | Alta         |
| AUTH-04   | Usuário vazio é rejeitado                                         | Média        |
| AUTH-05   | Senha vazia é rejeitada                                           | Média        |
| AUTH-06   | Logout encerra sessão e impede acesso direto ao catálogo          | Alta         |
| CAT-01    | Ordenação de nomes de Z a A                                       | Média        |
| CAT-02    | Ordenação de preços do menor ao maior                             | Média        |
| CART-01   | Adição preserva nome, preço e quantidade                          | Alta / smoke |
| CART-02   | Remoção esvazia carrinho e remove badge                           | Alta         |
| CHK-01    | Compra apresenta subtotal 29.99, imposto 2.40 e total 32.39       | Alta / smoke |
| CHK-02    | Primeiro nome obrigatório                                         | Média        |
| CHK-03    | Sobrenome obrigatório                                             | Média        |
| CHK-04    | Código postal obrigatório                                         | Média        |
| CAT-03    | Ordenação de preços do maior ao menor                             | Média        |
| CAT-04    | Restaura ordenação de A a Z                                       | Média        |
| CART-03   | Preserva nome, preço e badge após recarregar                      | Alta         |
| CART-04   | Remoção seletiva preserva o segundo produto                       | Alta         |
| CHK-05    | Cancelamento do formulário preserva carrinho                      | Alta         |
| CHK-06    | Cancelamento da revisão preserva produto                          | Alta         |
| CHK-07    | Compra de dois produtos soma 39.98 + 3.20 = 43.18                 | Alta         |
| ACCESS-01 | Sem sessão, catálogo redireciona para login                       | Alta         |
| ACCESS-02 | Sem sessão, carrinho redireciona para login                       | Alta         |
| ACCESS-03 | Sem sessão, formulário de checkout redireciona para login         | Alta         |
| ACCESS-04 | Sem sessão, revisão de checkout redireciona para login            | Alta         |
| ACCESS-05 | Sem sessão, detalhes de produto redirecionam para login           | Alta         |
| PROD-01   | Nome, descrição e preço são preservados entre catálogo e detalhes | Alta         |
| PROD-02   | Adição pelos detalhes preserva produto e preço no carrinho        | Alta / smoke |
| PROD-03   | Remoção nos detalhes atualiza catálogo e carrinho                 | Alta         |
| PROD-04   | Produto com parênteses no nome é localizado sem ambiguidade       | Média        |

## Priorização por risco

A prioridade é uma avaliação qualitativa do impacto no fluxo demonstrado, não uma probabilidade medida nem uma regra de negócio fornecida por uma empresa.

| Risco                                    | Impacto no usuário                                        | Cobertura                                    | Justificativa                                              |
| ---------------------------------------- | --------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Sessão e controle de acesso incorretos   | Usuário entra indevidamente ou mantém acesso após sair    | AUTH-01 a AUTH-06, ACCESS-01 a ACCESS-05     | Pré-condição de toda a compra                              |
| Produto ou estado divergente entre telas | Usuário adiciona ou remove um item diferente do escolhido | PROD-01 a PROD-04, CART-01, CART-02, CART-04 | Identidade do produto deve ser preservada                  |
| Perda de carrinho ao navegar             | Usuário precisa refazer a seleção                         | CART-03, CHK-05, CHK-06                      | Estado da compra afeta continuidade                        |
| Cobrança exibida incorretamente          | Revisão apresenta soma incompatível com os itens          | CHK-01, CHK-07                               | Verificação independente de subtotal, imposto e total      |
| Compra inviável em tela pequena          | Usuário móvel não conclui o fluxo essencial               | Quatro testes @smoke no mobile-chromium      | Validação funcional em viewport reduzida com toque emulado |
| Escolha prejudicada pela ordenação       | Usuário não encontra a sequência escolhida                | CAT-01 a CAT-04                              | Menor impacto que acesso, carrinho e fechamento            |

## Matriz de execução

- Desktop: os 30 cenários em Chromium, Firefox e WebKit (90 execuções).
- Mobile Web: quatro cenários @smoke com emulação Pixel 7 no Chromium (quatro execuções).
- Total padrão: 94 execuções para 30 comportamentos distintos.
- Preparação: contexto limpo por cenário; checkout recebe produtos por opção de fixture e prepara a seleção pela UI.
- Massa: credenciais públicas e catálogo conhecido; nenhuma compra ou cobrança real.

## Critério de conclusão

Lint, formatação e tipos aprovados; todos os testes selecionados aprovados. No CI, aprovação somente após retry é classificada como flaky e também reprova a pipeline. Uma falha por indisponibilidade externa continua sendo falha da execução e deve ser identificada com evidências.

## Riscos e lacunas

SauceDemo é externo e pode mudar ou ficar indisponível. ACCESS verifica redirecionamento e ausência de itens na interface; não atesta autorização de backend, proteção de dados ou segurança geral. O smoke mobile não cobre todos os dispositivos, orientação, zoom ou ausência de overflow. Não verifica estoque, pagamento, entrega, APIs, desempenho ou acessibilidade. O imposto esperado é uma referência fixa da demonstração, não uma regra fiscal geral.

As contagens de testes não expressam uma porcentagem de cobertura da aplicação. Novos casos devem estar ligados a um risco e a uma expectativa observável.
