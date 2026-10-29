# Registro de validação local

Data: 29/10/2026. Ambiente: macOS, Node 22, Playwright, SauceDemo público. Execução final com CI=1: dois workers, até dois retries e failOnFlakyTests habilitado.

| Verificação                                     | Resultado observado                                   |
| ----------------------------------------------- | ----------------------------------------------------- |
| ESLint, Prettier e TypeScript                   | Aprovados                                             |
| Checkout e detalhes após correções              | 35 execuções aprovadas                                |
| Quatro smokes repetidos cinco vezes no Chromium | 20 execuções aprovadas em 9,6 segundos                |
| Regressão completa                              | 94 execuções aprovadas em 40,2 segundos               |
| Repetições necessárias na regressão final       | Nenhuma                                               |
| JUnit da regressão                              | 94 casos; zero falhas e zero ignorados                |
| PDF                                             | Gerado e conteúdo extraído para confirmar atualização |

Os 94 resultados correspondem a 30 cenários em três motores desktop e quatro cenários repetidos no mobile Web. As 20 execuções adicionais de estabilidade não são novos comportamentos e não garantem ausência futura de instabilidade.

## Como reproduzir

```bash
npm ci
npx playwright install
npm run quality
npm run test:stability
npm run test:regression
npm run report
```

Para reproduzir as regras de CI no bash/zsh, use CI=1 antes do comando npm. A pipeline utiliza Linux; esta validação local não substitui confirmar a execução do commit publicado no GitHub Actions.

O relatório HTML e o JUnit locais ficam em diretórios ignorados pelo Git. Uma nova execução os substitui. Este arquivo registra a observação desta revisão; não deve ser tratado como um indicador atualizado automaticamente.
