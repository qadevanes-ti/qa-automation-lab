<div align="center">

# QA Automation Lab

**Automação Web · Playwright + TypeScript · SauceDemo**

Portfólio de engenharia de qualidade: estratégia de testes, arquitetura de automação e integração contínua para e-commerce.

[![QA Automation Lab](https://github.com/qadevanes-ti/qa-automation-lab/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/qadevanes-ti/qa-automation-lab/actions/workflows/playwright.yml)

![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge)
![Arquitetura](https://img.shields.io/badge/Arquitetura-Page_Objects-172554?style=for-the-badge)

[Manual de estudo](docs/MANUAL.md) · [Manual em PDF](docs/manual-qa-automation-lab.pdf) · [Plano de testes](docs/TEST-PLAN.md)

</div>

**Autor:** [Adevanes](https://github.com/qadevanes-ti)

## Objetivo

Validar a jornada de compra de um e-commerce com uma suíte E2E organizada por domínio, cobrindo autenticação, catálogo, carrinho e checkout. O projeto demonstra planejamento de cobertura, implementação com Page Object Model, isolamento de cenários e diagnóstico de falhas. Aplicação: [SauceDemo](https://www.saucedemo.com), loja pública para treinamento. As compras são simuladas.

## Competências demonstradas

- Planejamento de cenários positivos e negativos com rastreabilidade por identificador.
- Automação em TypeScript com tipagem estrita e Page Object Model.
- Preparação de cenários isolados e execução paralela em três motores de navegador.
- Validação de regras de negócio: persistência, remoção seletiva e totais de compra.
- Diagnóstico com relatórios HTML, JUnit, screenshots, vídeos e traces.
- Integração contínua com GitHub Actions e documentação reproduzível.

## Resultado de validação

A suíte possui **30 cenários de negócio**: 90 execuções desktop (Chromium, Firefox e WebKit) e quatro fluxos smoke em emulação mobile Web, totalizando **94 execuções**. Consulte a aba Actions para o resultado da versão publicada; o [registro de validação](docs/VALIDATION.md) descreve a execução local desta evolução.

## Demonstração

![Jornada real de login, carrinho e checkout no SauceDemo](docs/assets/checkout-demo.gif)

Captura de uma execução real no Chromium. Para acompanhar ao vivo na sua máquina, use `npm run test:demo`. A animação apresenta o fluxo; as assertivas da suíte são responsáveis pela validação.

## Comece aqui

Pré-requisitos: Node.js 22.13 ou superior e npm. Execute na pasta que contém `package.json`:

```bash
npm ci
npx playwright install
npm run typecheck
npm run test:chromium
npm run report
```

Em Linux, use `npx playwright install --with-deps`. O relatório abre com o comando `report`.

## Arquitetura

```mermaid
flowchart LR
  T[Tests: comportamento e expectativas] --> F[Fixtures: preparação isolada]
  F --> P[Pages: ações e localizadores]
  P --> W[Playwright: navegador]
  D[Data: massas tipadas] --> T
  D --> F
  C[Configuração e CI] --> T
  T --> R[HTML, JUnit e evidências]
```

```text
src/
  data/             Credenciais públicas, produto e comprador fictício
  fixtures/         Objetos de página e autenticação por teste
  pages/            Login, catálogo, carrinho e checkout
tests/              Cenários por domínio, com identificadores estáveis
docs/               Manual, plano de testes e PDF
scripts/            Geração reproduzível do manual
.github/workflows/  Pipeline de verificação e execução
playwright.config.ts  Navegadores, relatórios, tentativas e evidências
```

## Cobertura

| Domínio             | Cenários | Risco principal                                   |
| ------------------- | -------: | ------------------------------------------------- |
| Login               |        6 | Entrada indevida ou sessão não encerrada          |
| Proteção de rotas   |        5 | Telas de compra acessíveis sem sessão             |
| Catálogo            |        4 | Ordenação incompatível com a escolha do comprador |
| Detalhes de produto |        4 | Divergência de produto e estado entre telas       |
| Carrinho            |        4 | Perda de itens ou remoção incorreta               |
| Checkout            |        7 | Valores incorretos ou compra interrompida         |

O projeto `mobile-chromium` executa quatro testes `@smoke` com o perfil Pixel 7: login, adição pelo catálogo, adição pelos detalhes e compra completa. É emulação de navegador móvel; não substitui um aparelho físico ou uma auditoria de responsividade.

## Estratégia e decisões

- [Estratégia por riscos e plano de testes](docs/TEST-PLAN.md): prioridades, cobertura, limites e critérios de saída.
- [Decisões de arquitetura](docs/ARCHITECTURE.md): alternativas, justificativas e custos de manutenção.
- [Estudo de caso real de manutenção](docs/CASE-STUDY.md): investigação de um seletor incompatível com nomes que contêm parênteses.
- [Guia de diagnóstico](docs/TROUBLESHOOTING.md): distinguir defeitos da aplicação, automação e ambiente.

## Comandos

| Comando                 | Finalidade                                          |
| ----------------------- | --------------------------------------------------- |
| `npm test`              | Regressão desktop e smoke mobile Web                |
| `npm run test:chromium` | Executar os 30 cenários no Chromium                 |
| `npm run test:smoke`    | Executar quatro cenários essenciais                 |
| `npm run test:demo`     | Ver a compra ao vivo no navegador, com ações lentas |
| `npm run test:ui`       | Explorar testes na interface do Playwright          |
| `npm run test:debug`    | Depurar com Inspector                               |
| `npm run test:list`     | Listar cenários sem abrir navegador                 |
| `npm run lint`          | Verificar problemas de código e promises sem await  |
| `npm run format:check`  | Verificar a formatação                              |
| `npm run format`        | Formatar os arquivos                                |
| `npm run quality`       | Executar lint, formatação e tipos                   |
| `npm run typecheck`     | Verificar os tipos TypeScript                       |
| `npm run report`        | Abrir relatório HTML                                |
| `npm run docs:pdf`      | Gerar PDF a partir do manual                        |

Exemplo de filtro: `npx playwright test --project=chromium --grep AUTH-03`.
Para outro ambiente compatível com o SauceDemo, use `BASE_URL=https://seu-ambiente npm run test:chromium` (bash/zsh). Arquivos `.env` não são carregados automaticamente.

## Rotina de trabalho

```bash
# Antes de entregar uma alteração: lint, formatação, tipos e suíte Chromium
npm run check

# Executar por funcionalidade
npm run test:login
npm run test:catalog
npm run test:cart
npm run test:checkout

# Regressão desktop e smoke mobile Web
npm run test:regression

# Ver o navegador durante os testes
npm run test:headed

# Demonstração de compra com ações lentas
npm run test:demo

# Repetir um caso para investigar instabilidade
npx playwright test --project=chromium --grep CART-03 --repeat-each=5
```

Consulte o [guia de comandos](docs/COMMANDS.md) para instalação, filtros, depuração e relatórios.

## Qualidade e CI

A pipeline instala dependências pelo lockfile, verifica lint, formatação e tipos e executa os três navegadores em Node 22. Guarda HTML, JUnit e evidências por 14 dias. Localmente, falhas retêm screenshot, vídeo e trace; esses arquivos ficam fora do Git. Duas novas tentativas são permitidas no CI para produzir evidências, mas `failOnFlakyTests` mantém a pipeline vermelha se um teste passar apenas na repetição.

Cada cenário recebe um contexto isolado, sem dependência de ordem ou sessão global. Seletores usam `data-test`, com configuração explícita de `getByTestId`. Ações usam as esperas nativas do Playwright.

## Decisões e limites

A arquitetura separa regras de negócio nos testes, interações nas páginas, preparação nas fixtures e massas tipadas em arquivos de dados. Essa divisão reduz duplicação e concentra a manutenção dos localizadores. Playwright Test organiza cenários e etapas com `test.step`; a implementação utiliza os recursos nativos de espera e isolamento do framework.

O SauceDemo é externo e pode mudar ou ficar indisponível. A suíte cobre fluxos funcionais; acessibilidade, desempenho, pagamentos reais e testes de segurança estão fora do escopo. Não há custo de licença nas ferramentas; eventuais limites de minutos e armazenamento do GitHub Actions dependem da conta.

## Evolução sugerida

Próximos incrementos: acessibilidade automatizada e detalhes de produto com imagem, além de testes de API em uma aplicação com contrato documentado. Proteção de rotas, comparação de produto entre telas e smoke mobile Web já estão implementados.

## Referências

[Page Objects](https://playwright.dev/docs/pom) · [Fixtures](https://playwright.dev/docs/test-fixtures) · [Trace Viewer](https://playwright.dev/docs/trace-viewer)

Licença MIT.
