# Template definitivo das receitas

Esta é a estrutura **oficial e obrigatória** para toda nova receita do aplicativo. As receitas devem parecer **mini guias premium de alimentação infantil** — não simplificar nem encurtar campos.

Princípios:
- valor percebido
- sensação de cuidado
- UX premium
- leitura agradável
- experiência emocional

## Estrutura obrigatória

Cada receita é um `Recipe` (ver `src/lib/types.ts`) exportado de um arquivo próprio em `src/data/recipes/<slug>.ts` e registrado em `src/data/recipes.ts`.

Campos obrigatórios na ordem em que aparecem na tela:

| Campo | Tipo | Descrição |
|---|---|---|
| `image` | `string` | Imagem premium (hero). Importar de `src/assets/recipes/<slug>.jpg`. |
| `emoji` | `string` | Emoji de fallback caso a imagem falhe. |
| `title` | `string` | Nome completo da receita. |
| `meal` | `Meal` | Categoria principal (`cafe`/`almoco`/`lanche`/`jantar`). |
| `ageBands` | `AgeBand[]` | Faixas etárias adequadas. |
| `feedingMethods` | `FeedingStyle[]` | Métodos de introdução (`tradicional`/`blw`/`misto`). |
| `timeMinutes` | `number` | Tempo total de preparo. |
| `difficulty` | `Difficulty` | `facil` / `medio` / `avancado`. |
| `blwFriendly` | `boolean` | Tag BLW. |
| `quick` | `boolean` | `true` se ≤ 15 min. |
| `acceptanceFriendly` | `boolean` | Tag de boa aceitação. |
| `restrictionsSafe` | `Restriction[]` | Restrições atendidas (sem ovo, sem leite, etc.). |
| `allergens` | `string[]` | Alérgenos presentes. |
| `ingredients` | `string[]` | Lista detalhada com quantidades. |
| `steps` | `RecipeStep[]` | Passo a passo com `step`, `title`, `description`. Cada passo deve ter título curto + descrição rica. |
| `acceptanceTip` | `string` | Dica de aceitação (callout destacado). |
| `textureGuide` | `Partial<Record<AgeBand, string>>` | Textura ideal por faixa etária. |
| `nutritionHighlights` | `string[]` | Destaques nutricionais (chips). |
| `storage.fridge` | `string` | Conservação na geladeira. |
| `storage.freezer` | `string` | Conservação no freezer. |
| `feedingTip` | `string` | Dica de introdução alimentar (callout de fechamento). |
| `tip` | `string` | Dica curta complementar. |

A tela de detalhes (`src/routes/_app/receitas.$id.tsx`) renderiza automaticamente o CTA final ("Marcar como servido" + feedback) — não precisa ser declarado na receita.

## Checklist antes de publicar uma receita nova

- [ ] Imagem premium, clean, alimento centralizado, proporção mobile-first
- [ ] Título humano, sem jargão técnico
- [ ] Todos os campos da tabela acima preenchidos (sem placeholders)
- [ ] Steps com descrição rica, não apenas instruções secas
- [ ] `acceptanceTip` e `feedingTip` com tom acolhedor
- [ ] `textureGuide` cobrindo todas as `ageBands` da receita
- [ ] `storage.fridge` e `storage.freezer` com prazos concretos
- [ ] Adicionada ao array em `src/data/recipes.ts`

## O que NÃO fazer

- Não criar receitas mockadas ou placeholders
- Não preencher campos com texto fake
- Não gerar receitas automaticamente
- Não simplificar a estrutura "porque é uma receita simples"
- Não remover seções premium
