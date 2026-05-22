# Lote 2 — Almoço (7 receitas)

## Esclarecimento sobre as "3 sugestões do café"
As 6 receitas do Lote 1 já estão implementadas em `src/data/recipes.ts`. A tela inicial mostra menos porque filtra por faixa etária do bebê (`filterRecipes` em `src/lib/baby.ts`). Não é bug. Se quiser, posso, em paralelo, ampliar os `ageBands` das receitas de café para cobrir todas as fases — me confirme.

## Receitas a criar (mantendo template premium completo)
Todas seguem exatamente a estrutura do Lote 1: `steps` detalhados, `feedingTip`, `acceptanceTip`, `textureGuide`, `nutritionHighlights`, `allergens`, `storage`, `tip`, `texture`, `difficulty`, `feedingMethods`, flags (`quick`, `blwFriendly`, `acceptanceFriendly`), `restrictionsSafe`, `emoji`, `image`.

1. `arroz-feijao-frango` — Arroz com Feijão e Frango Desfiado (8-12m, 1-2a, 2-3a)
2. `pure-abobora-carne` — Purê de Abóbora com Carne Desfiada (8-12m, 1-2a)
3. `macarrao-legumes` — Macarrão com Legumes Macios (1-2a, 2-3a) — BLW
4. `almondega-batata` — Almôndega Macia com Batata (1-2a, 2-3a) — BLW
5. `arroz-legumes-ovo` — Arroz Cremoso com Legumes e Ovo (8-12m, 1-2a, 2-3a)
6. `frango-batata-doce` — Frango Desfiado com Batata-Doce (8-12m, 1-2a, 2-3a) — BLW
7. `lentilha-arroz-legumes` — Lentilha com Arroz e Legumes (1-2a, 2-3a)

Observação: você colou `frango-batata-doce` e `lentilha-arroz-legumes` duplicados — vou considerar apenas uma versão de cada (idêntica).

Ajuste de tipos: `macarrao-legumes` lista `"gluten"` em `allergens`, mas o tipo `Restriction` não tem `sem_gluten`? Tem sim — mantém só como string em `allergens` (que é `string[]`), ok.

## Arquivos
**Criar:**
- `src/data/recipes/arroz-feijao-frango.ts`
- `src/data/recipes/pure-abobora-carne.ts`
- `src/data/recipes/macarrao-legumes.ts`
- `src/data/recipes/almondega-batata.ts`
- `src/data/recipes/arroz-legumes-ovo.ts`
- `src/data/recipes/frango-batata-doce.ts`
- `src/data/recipes/lentilha-arroz-legumes.ts`
- `src/assets/recipes/<slug>.jpg` para cada uma (7 imagens, 1024x1024, tier `fast`, fotografia gastronômica realista de pratos infantis em louça neutra, luz natural, fundo limpo)

**Atualizar:**
- `src/data/recipes.ts` — importar e adicionar as 7 receitas ao array `recipes`

## Fora de escopo
- Sem alterações em tipos, hooks, componentes, tela de detalhe ou receitas existentes.
- Sem mexer na lógica de filtros/sugestões.
