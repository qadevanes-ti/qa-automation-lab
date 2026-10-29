# Decisões de arquitetura

Estado: implementadas nesta versão. Revisar estas decisões quando o contexto mudar.

## 1. Playwright Test com Page Objects por área

Testes descrevem comportamentos e expectativas; páginas concentram seletores e ações. Fixtures criam os objetos por teste. TypeScript estrito e lint com informação de tipos detectam incompatibilidades e promises sem await.

Alternativa considerada: escrever todos os seletores diretamente nos testes. É simples no início, mas espalha manutenção à medida que os fluxos compartilham telas. Não usamos uma classe BasePage ou uma DSL genérica de click/fill: as ações nativas já oferecem esperas e mensagens úteis.

Custo: é preciso navegar entre teste, fixture e página. Métodos devem representar ações reais, sem esconder a expectativa de negócio.

## 2. Preparação parametrizável do checkout

checkoutStarted depende de authenticatedInventory e da opção checkoutCart. O valor padrão contém uma mochila; CHK-07 sobrescreve a seleção com dois produtos. A fixture valida nome e preço do carrinho antes de abrir o formulário. O relatório identifica a preparação em test.step.

Alternativa anterior: abrir o checkout de um produto, cancelar, voltar ao catálogo e adicionar o segundo. Isso introduzia navegação de cancelamento em um cenário cujo objetivo é validar totais. A preparação atual separa essas intenções.

A opção é um objeto com uma lista products. Isso evita a ambiguidade de arrays usados diretamente nas tuplas de configuração de fixtures do Playwright.

Custo: autenticação e montagem de carrinho continuam pela UI em cada teste. A repetição é aceitável para esta aplicação pequena. Setup por API ou storageState só deve ser introduzido com contrato conhecido e invalidação de sessão bem definida.

## 3. Identificação exata e escopo dos elementos

Preferimos data-test, acessibilidade e texto literal exato. InventoryPage restringe ações ao cartão que contém o nome exato; ProductPage restringe campos ao contêiner de detalhes. O mesmo data-test aparece no catálogo e nos detalhes, por isso o escopo evita ambiguidade durante a transição da tela.

Uma expressão regular montada diretamente com o nome do produto foi substituída por getByText com exact. A regressão PROD-04 cobre um nome com pontos e parênteses. O contêiner CSS dos detalhes é uma dependência explícita, isolada na página; se o aplicativo oferecer um test ID exclusivo no futuro, ele pode substituir essa classe.

## 4. Desktop completo e mobile por risco

Os três motores desktop executam a regressão completa. O projeto mobile-chromium usa Pixel 7 e filtra @smoke para exercitar entrada, seleção e fechamento, sem multiplicar toda a suíte sem uma necessidade demonstrada.

Custo: emulação não comprova funcionamento em aparelhos reais. Os testes verificam fluxos e controles alcançáveis por rolagem; não afirmam cobertura visual completa.

## 5. Retries para diagnóstico, sem aprovação silenciosa

Não há retries locais. No CI há duas novas tentativas para ajudar a distinguir instabilidade de falha reproduzível. failOnFlakyTests reprova a execução se o caso passar apenas após retry. Screenshots, vídeos, traces e JUnit ficam nos artefatos.

Alternativa: aceitar qualquer aprovação no retry. Foi rejeitada porque ocultaria instabilidade. Não usamos waitForTimeout ou sleep para sincronização. Mudanças em timeout exigem diagnóstico da causa.

## 6. Massa fixa e escopo de integração

Nomes, descrições e preços conhecidos tornam a falha reproduzível e possibilitam um oráculo independente para os valores. Comparações entre telas não substituem comparar contra a referência fixa: duas telas poderiam apresentar o mesmo preço errado.

Não há endpoints inventados, mocks de compras ou serviços de API sem contrato público. Se o catálogo mudar intencionalmente, primeiro revisar o comportamento esperado e a massa; não atualizar snapshots ou expectativas apenas para passar.
