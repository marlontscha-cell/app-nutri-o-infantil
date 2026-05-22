
# Plano: corrigir abertura da tela de detalhe da receita

## Diagnóstico

Estrutura atual de rotas:

```
src/routes/_app/
  receitas.tsx        → /receitas      (lista, com filtros)
  receitas.$id.tsx    → /receitas/$id  (detalhe)
```

Em TanStack Router (flat routing), quando existem **dois arquivos irmãos** onde um é o "base" (`receitas.tsx`) e o outro estende o caminho (`receitas.$id.tsx`), o primeiro vira **layout pai** do segundo. Para o filho aparecer, o pai precisa renderizar `<Outlet />`.

O `receitas.tsx` atual **não** tem `<Outlet />` — ele renderiza a página de lista inteira (header, chips, grid). Resultado: ao acessar `/receitas/pure-mandioquinha-frango`, a rota filha casa, mas só a UI da lista aparece. Como o perfil do bebê pode ter idade fora de 8–12m/1–2a, o filtro zera a lista e mostra o `EmptyState` "Nada por aqui ainda".

Itens 1–5 da sua checagem estão corretos:
1. `RecipeCard` e `MealCard` passam `params={{ id: recipe.id }}` para `/receitas/$id` — OK.
2. `receitas.$id.tsx` busca `recipes.find(r => r.id === params.id)` — OK, o `id` é `"pure-mandioquinha-frango"`.
3. Não há conflito id/slug — `slug` existe na receita mas a rota usa só `id`.
4. A tela de detalhe já trata `steps` como `RecipeStep[]` (renderiza `s.step`, `s.title`, `s.description`).
5. `feedingTip`, `acceptanceTip`, `textureGuide`, `nutritionHighlights`, `storage` já são renderizados condicionalmente.

## Correção

Renomear o arquivo da lista para tornar lista e detalhe **rotas irmãs**, não pai/filho:

```
src/routes/_app/
  receitas.index.tsx  → /receitas       (lista)
  receitas.$id.tsx    → /receitas/$id   (detalhe)
```

Em flat routing, `receitas.index.tsx` mapeia para `/receitas` exatamente, sem se tornar pai de `receitas.$id.tsx`.

### Passos

1. **Renomear** `src/routes/_app/receitas.tsx` → `src/routes/_app/receitas.index.tsx`.
2. **Atualizar a string da rota** dentro do arquivo: `createFileRoute("/_app/receitas")` → `createFileRoute("/_app/receitas/")` (o `index` adiciona a barra final no path interno).
3. **Atualizar `src/routeTree.gen.ts`** para refletir o novo arquivo (o plugin do TanStack regenera, mas como esse projeto comita o arquivo, precisamos ajustar os imports e nodes para apontar para `receitas.index.tsx` com path `/`).
4. **Não tocar em nada mais** — `receitas.$id.tsx`, dados da receita, componentes e links continuam exatamente iguais.

## Verificação pós-fix

- Abrir `/` → clicar no card de almoço → deve abrir `/receitas/pure-mandioquinha-frango` com hero, título, chips, ingredientes, passos (com número/título/descrição), guia de textura, nutrição, conservação, dicas e botão ♥.
- Abrir `/receitas` (Tudo) → deve listar a receita normalmente.
- Abrir `/receitas/algum-id-invalido` → mostra `notFoundComponent` ("Receita não encontrada"), não a lista.

## Notas técnicas

- Nenhuma mudança em dados, tipos, componentes de UI ou hooks.
- Sem novas dependências.
- O `routeTree.gen.ts` precisa ser ajustado manualmente porque o projeto o mantém versionado.
