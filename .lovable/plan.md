# Lote 1 — 6 receitas de café da manhã

Implementa as 6 receitas enviadas seguindo exatamente o template premium aprovado (todos os campos preservados, sem simplificação). Imagens no tier `fast` (consistente com a Mandioquinha).

## Receitas

1. Papa de Banana com Aveia (`papa-banana-aveia`)
2. Mingau Cremoso de Maçã e Aveia (`mingau-maca-aveia`)
3. Panquequinha de Banana para Bebês (`panquequinha-banana-bebe`)
4. Mamão com Chia e Banana (`mamao-chia-banana`) — id normalizado sem acento para URL segura (você enviou `id: "mamão-chia-banana"` com acento, mas o `slug` já é sem acento; alinho os dois em `mamao-chia-banana`).
5. Creme de Abacate com Banana (`creme-abacate-banana`)
6. Cuscuz Macio com Ovo Mexido (`cuscuz-ovo-mexido`)

Todos os campos enviados são mantidos integralmente: `steps`, `feedingTip`, `acceptanceTip`, `textureGuide`, `nutritionHighlights`, `allergens`, `storage`, `tip`, `texture`, `difficulty`, `feedingMethods`, `quick`, `acceptanceFriendly`, `blwFriendly`, `restrictionsSafe`.

## Imagens (tier fast, 1024x1024, salvas em `src/assets/recipes/`)

Padrão comum: fotografia gastronômica realista, luz natural suave de manhã, louça artesanal clara, mesa de madeira clara, pano de linho neutro, tons quentes e acolhedores, estética maternidade premium, comida em destaque, fundo desfocado leve.

- `papa-banana-aveia.jpg` — tigela pequena de cerâmica clara com papa cremosa amarelo-claro de banana e aveia, rodelinhas de banana ao lado, colher de madeira pequena.
- `mingau-maca-aveia.jpg` — tigela rasa branca com mingau bege-claro de maçã e aveia, cubinhos de maçã visíveis, polvilho leve de aveia em flocos.
- `panquequinha-banana-bebe.jpg` — pratinho com mini panquecas douradas de banana empilhadas, rodelas de banana ao lado, textura macia, douradinhas dos dois lados.
- `mamao-chia-banana.jpg` — taça baixa de vidro ou cerâmica clara com creme alaranjado de mamão e banana amassados, sementes de chia distribuídas por cima.
- `creme-abacate-banana.jpg` — tigelinha branca com creme verde-claro liso de abacate e banana, metade de abacate ao lado, banana descascada cortada.
- `cuscuz-ovo-mexido.jpg` — pratinho fundo com cuscuz amarelo soltinho ao lado de ovo mexido bem macio, garfo pequeno, vapor sutil.

## Arquivos a criar

- `src/data/recipes/papa-banana-aveia.ts`
- `src/data/recipes/mingau-maca-aveia.ts`
- `src/data/recipes/panquequinha-banana-bebe.ts`
- `src/data/recipes/mamao-chia-banana.ts`
- `src/data/recipes/creme-abacate-banana.ts`
- `src/data/recipes/cuscuz-ovo-mexido.ts`
- 6 imagens correspondentes em `src/assets/recipes/`

## Arquivo a atualizar

- `src/data/recipes.ts` — importar e adicionar as 6 receitas ao array `recipes` (mantendo `pureMandioquinhaFrango`).

## Fora de escopo

- Sem mudanças no template da tela de detalhes
- Sem mudanças em tipos, hooks ou componentes
- Sem alteração da receita Mandioquinha existente

## Detalhes técnicos

- Cada arquivo exporta um `Recipe` tipado de `@/lib/types`.
- Imagens importadas como ES6 (`import image from "@/assets/recipes/<slug>.jpg"`).
- Geração das 6 imagens em paralelo via `imagegen--generate_image` no tier `fast`.
