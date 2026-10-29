# Diagnóstico de falhas

## Sequência de investigação

1. Identifique o caso, o navegador, o commit e a tentativa no relatório.
2. Abra o trace e localize a primeira ação ou assertiva que falhou; uma falha na fixture é preparação, não conclusão do comportamento.
3. Compare o esperado com o DOM e a tela capturados. Observe console e rede quando forem relevantes.
4. Reproduza o identificador no mesmo navegador. Para instabilidade, repita o caso e registre frequência e condições.
5. Classifique a causa com evidências e aplique a correção na camada responsável.
6. Execute o caso afetado e a regressão adequada. Atualize o plano se a regra de negócio mudou.

| Evidência                       | Hipótese inicial                 | Próxima verificação                                      |
| ------------------------------- | -------------------------------- | -------------------------------------------------------- |
| Executável do navegador ausente | Ambiente incompleto              | npx playwright install                                   |
| DNS, conexão ou certificado     | Rede ou ambiente                 | Verificar disponibilidade do site e erro original        |
| Strict mode violation           | Locator resolve vários elementos | Escopo da página, texto exato e transição do DOM         |
| Campo esperado não aparece      | Regra, navegação ou preparação   | Inspecionar a ação anterior e a fixture no trace         |
| Totais divergentes              | Dado ou cálculo da aplicação     | Comparar itens, massa de referência e valores observados |
| Passou só no retry              | Instabilidade ainda sem causa    | Repetir caso, observar diferenças e manter CI reprovado  |

Uma hipótese não é um diagnóstico confirmado. Registre evidência antes de atribuir a causa à aplicação ou à infraestrutura.

## Comandos

```bash
npm run report
npx playwright test --project=chromium --grep CHK-07
npx playwright test --project=chromium --grep PROD-04 --repeat-each=5
npm run test:stability
```

A execução seguinte substitui o relatório local. Copie os arquivos relevantes antes de executá-la, se precisar preservar um incidente. No GitHub Actions, baixe qa-evidence da execução correta.

## Registro de um defeito

Preencha: título, ambiente/commit, identificador do teste, pré-condições, passos, esperado, observado, impacto, reprodução e anexos. Diferencie severidade do impacto e prioridade de correção. Use o estudo de caso do seletor como exemplo real de manutenção; não registre falhas simuladas como defeitos reais da aplicação.
