# Estudo de caso: nome de produto tratado como expressão regular

## Contexto e impacto

A primeira implementação de InventoryPage.item criava uma expressão regular com o nome do produto. Os testes existentes usavam mochila e luz de bicicleta, cujos nomes não revelavam o problema. O catálogo também contém Test.allTheThings() T-Shirt (Red).

Esse é um defeito da automação: um produto válido poderia ficar impossível de selecionar pelos métodos reutilizáveis. Não foi identificado como defeito da loja.

## Reprodução mínima da causa

```javascript
const name = 'Test.allTheThings() T-Shirt (Red)';
console.log(new RegExp(`^${name}$`).test(name)); // false
```

Ponto e parênteses têm significado na expressão regular. Portanto, a busca não representa o nome literal. Essa reprodução verifica a causa em JavaScript; não afirma que o cenário antigo havia sido executado e falhado com esse produto.

## Correção e regressão

A página passou a procurar texto literal com exact: true dentro do cartão do produto. PROD-04 adiciona a camiseta, abre os detalhes e valida nome, preço e estado Remove. A regressão exerce a interação real com o site e fica vinculada ao plano de testes.

```bash
npx playwright test tests/product.spec.ts --project=chromium --grep PROD-04
```

A ampliação de cobertura revelou ainda um ponto de sincronização: campos do catálogo e dos detalhes compartilham data-test. Uma mudança de URL pode anteceder a atualização do DOM. Os locators de ProductPage agora partem do contêiner exclusivo dos detalhes e aguardam os elementos pela própria assertiva.

## O que explicar numa entrevista

A hipótese veio da leitura do código e da variação dos dados do catálogo. A reprodução mínima isolou o tratamento incorreto de texto. A correção atua na causa; não aumenta timeout e não utiliza first() para esconder ambiguidade. O cenário novo protege a interação de negócio contra regressão.
