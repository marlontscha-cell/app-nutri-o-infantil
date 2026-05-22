# Ajustes no template definitivo de receita

Mantém integralmente o layout, hierarquia, seções e design premium atuais. Apenas refina detalhes visuais e microinterações.

## 1. Imagem principal +10%

Arquivo: `src/routes/_app/receitas.$id.tsx` (bloco hero)

- Trocar `aspect-[4/3]` por `aspect-[10/9]` (≈+10% de altura relativa, mantendo largura full e centralização).
- Manter `object-cover`, fallback de emoji e botões flutuantes (voltar/favorito) nas mesmas posições.
- Sem mudanças no resto do hero.

## 2. Favoritos com animação + toast

Arquivo: `src/routes/_app/receitas.$id.tsx` (botão de coração no hero)

- Adicionar estado local `pulse` ao clicar e classe `animate-[heart-pop_400ms_ease-out]` no ícone `Heart`.
- Definir keyframe `heart-pop` em `src/styles.css`:
  ```
  @keyframes heart-pop {
    0% { transform: scale(1); }
    35% { transform: scale(1.35); }
    60% { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  ```
- Disparar `toast.success("Receita adicionada aos favoritos 💛")` ou `toast("Receita removida dos favoritos")` via `sonner` conforme novo estado.
- Não navegar; permanecer na tela.

## 3. "Marcar como servido" com microinteração + toast

Arquivo: `src/routes/_app/receitas.$id.tsx` (sticky action bar)

- Ao clicar, aplicar transição `active:scale-[0.97]` + animação `animate-[served-pop_500ms_ease-out]` no ícone `Check`.
- Adicionar keyframe `served-pop` em `src/styles.css` (scale + leve rotação).
- Disparar `toast.success("Refeição marcada como servida 🍽️")`.
- Manter o fluxo atual de revelar o seletor de feedback logo abaixo (sem redirecionar para home).

## 4. Template definitivo (documentação)

Criar `src/data/recipes/README.md` consolidando a estrutura oficial obrigatória para toda nova receita:

- imagem premium (`image`)
- título (`title`), emoji (`emoji`)
- categorias (`meal`, `ageBands`, `feedingMethods`)
- tags (`blwFriendly`, `quick`, `acceptanceFriendly`, `difficulty`)
- tempo (`timeMinutes`)
- restrições (`restrictionsSafe`, `allergens`)
- ingredientes (`ingredients`)
- preparo detalhado (`steps[]` com title + description)
- dica de aceitação (`acceptanceTip`)
- textura ideal por idade (`textureGuide`)
- destaques nutricionais (`nutritionHighlights`)
- conservação (`storage.fridge`, `storage.freezer`)
- dica de introdução alimentar (`feedingTip`)
- CTA final (renderizado automaticamente pela tela)

Tom: "mini guia premium de alimentação infantil". Não simplificar nem encurtar campos em receitas futuras.

## Fora de escopo

- Sem mudanças em tipos (`src/lib/types.ts`), hooks (`use-favorites`, `use-daily-plan`) ou dados existentes.
- Sem alteração da receita atual.
- Sem novas receitas.

## Detalhes técnicos

- `sonner` já está integrado (Toaster montado no root). Importar `toast` de `"sonner"` no arquivo da rota.
- Keyframes adicionados em `src/styles.css` para reutilização global.
- Mudança de aspect ratio é puramente CSS (Tailwind arbitrary value).
