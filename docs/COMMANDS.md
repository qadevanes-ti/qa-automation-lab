# Guia de comandos

Execute na pasta que contém package.json. Use Node 22 ou superior.

| Objetivo | Comando |
| --- | --- |
| Instalar versões do lockfile | `npm ci` |
| Instalar navegadores | `npx playwright install` |
| Instalar dependências Linux | `npx playwright install --with-deps` |
| Verificar tipos | `npm run typecheck` |
| Validar alteração local | `npm run check` |
| Regressão nos três motores | `npm run test:regression` |
| Smoke no Chromium | `npm run test:smoke` |
| Login | `npm run test:login` |
| Catálogo | `npm run test:catalog` |
| Carrinho | `npm run test:cart` |
| Checkout | `npm run test:checkout` |
| Navegador visível | `npm run test:headed` |
| Compra visível com ações lentas | `npm run test:demo` |
| Painel de testes e snapshots | `npm run test:ui` |
| Inspector passo a passo | `npm run test:debug` |
| Relatório da última execução | `npm run report` |
| Listar casos | `npm run test:list` |
| Gerar manual PDF | `npm run docs:pdf` |

## Filtros e investigação

```bash
npx playwright test --project=chromium --grep CHK-07
npx playwright test --project=firefox
npx playwright test --project=chromium --grep CART-03 --repeat-each=5
npm run test:debug -- --grep AUTH-01
```

O modo UI mostra snapshots quando você seleciona ações. Para assistir ao site sendo controlado ao vivo, use test:demo. O navegador fecha ao fim da demonstração. O modo debug pausa antes das ações: use Step over para avançar ou Resume para continuar.

O relatório é substituído pela execução seguinte. Evidências de falha ficam em test-results e não entram no Git. Na pipeline, consulte o artefato qa-evidence da execução correspondente. Para um trace específico, use `npx playwright show-trace` seguido do caminho real do arquivo trace.zip.

## Rotina sugerida

1. Execute o cenário alterado com --grep.
2. Execute npm run check para verificar tipos e a suíte Chromium.
3. Execute npm run test:regression para validar os três navegadores.
4. Revise o relatório e o diff antes de publicar.

Falha deve ser investigada; novas tentativas não substituem a correção de testes instáveis.
