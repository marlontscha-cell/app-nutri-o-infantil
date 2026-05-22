
# Plano: Receitas reais + tela premium

## 1. Atualizar tipagem (`src/lib/types.ts`)

Expandir `Recipe` para suportar a estrutura premium:

- `slug: string`
- `feedingMethods: FeedingStyle[]`
- `difficulty: "facil" | "medio" | "avancado"`
- `steps: RecipeStep[]` onde `RecipeStep = { step: number; title: string; description: string }`
- `feedingTip?: string`
- `acceptanceTip?: string`
- `textureGuide?: Partial<Record<AgeBand, string>>`
- `nutritionHighlights?: string[]`
- `allergens?: string[]`
- `storage?: { fridge?: string; freezer?: string }`
- `image?: string`

Manter `tip`, `texture`, `emoji` para compatibilidade com home/cards/SOS.

## 2. Remover todas as receitas mockadas

- Criar `src/data/recipes/pure-mandioquinha-frango.ts` (1 arquivo por receita — escalável).
- `src/data/recipes.ts` vira só o agregador: `export const recipes = [pureMandioquinhaFrango]`.

## 3. Gerar imagem (tier `fast`)

- `src/assets/recipes/pure-mandioquinha-frango.jpg`
- Prompt: fotografia gastronômica realista, purê de mandioquinha cremoso com frango desfiado em tigela de cerâmica clara infantil, luz natural suave, fundo de madeira clara minimalista, tons quentes e acolhedores, sem texto, ângulo 45°.
- Importar e atribuir a `image`.

## 4. Ajustar lógica

- `src/lib/baby.ts`: filtros seguem funcionando; adicionar suporte opcional a `feedingMethods`.
- `useDailyPlan` / home: fallback gracioso para slots sem receita disponível (estado "Em breve" no card, sem quebrar).

## 5. Redesenhar tela de detalhe (`receitas.$id.tsx`)

Layout mobile-first premium:

```text
┌───────────────────────────────┐
│  [imagem real 4:3]            │
│  ← voltar          ♥ favorito │
├───────────────────────────────┤
│  ALMOÇO · 8–12m · 1–2a        │
│  Purê de Mandioquinha…        │
│  ⏱ 25 min · Fácil · Sem ovo…  │
├───────────────────────────────┤
│  💡 Dica de aceitação         │  (acceptanceTip)
├───────────────────────────────┤
│  Ingredientes                 │
├───────────────────────────────┤
│  Modo de preparo              │
│  ① Título do passo            │
│     descrição detalhada       │
├───────────────────────────────┤
│  Textura por idade            │  (textureGuide)
├───────────────────────────────┤
│  Destaques nutricionais       │  (chips)
├───────────────────────────────┤
│  Conservação                  │  (geladeira/freezer)
├───────────────────────────────┤
│  💡 Dica da introdução        │  (feedingTip)
└───────────────────────────────┘
[sticky] Marcar como servido / feedback
```

Princípios: hierarquia clara, espaçamento generoso, só tokens semânticos, imagem real (emoji vira fallback), seções condicionais (não renderiza se campo vazio).

## 6. Validação

- Build/typecheck.
- Home, SOS e Bebê continuam renderizando com 1 só receita.
- QA visual da tela de detalhe.

---

## Notas

- Imagem em tier `fast` (aprovado para MVP); refinaremos depois.
- Nenhuma rota nova, nenhuma dependência nova.
- Arquitetura modular pronta para você mandar as próximas receitas uma a uma.
