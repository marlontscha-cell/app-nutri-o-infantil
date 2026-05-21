# Plano: Receitas do Bebê → Copiloto Diário

Objetivo: transformar o app atual de "catálogo + sugestões" em um **painel diário** que resolve "o que meu bebê vai comer hoje?" em poucos segundos, com foco em retenção (não monetização).

---

## 1. Nova arquitetura de experiência

Fluxo principal (1 mão, poucos toques):

```
Abrir app
  → Home (Plano do dia: 4 refeições já sugeridas)
  → Tocar refeição → Receita guiada
  → "Marcar como servido" + feedback (amou / aceitou / rejeitou)
  → Voltar para Home (refeição marcada como feita)

Atalhos sempre visíveis:
  → SOS Refeição (ajuda situacional)
  → Trocar sugestão de uma refeição específica
```

Sem catálogo na navegação principal. Receitas viram **resultado de uma decisão**, não destino.

---

## 2. Mudanças na navegação

Bottom nav atual (5 itens) → **3 itens**:

- **Hoje** (home / plano do dia) — destino principal
- **SOS** (ajuda rápida situacional) — novo
- **Bebê** (perfil + histórico de aceitação) — funde Perfil + Favoritos

`/receitas` e `/idades` deixam de ser abas. Continuam acessíveis via links contextuais (ex: "ver mais ideias para o almoço"), mas não competem com o fluxo diário.

---

## 3. Telas

### 3.1 Home — "Hoje" (`/`)

Hero acolhedor:
- "Bom dia, mamãe 👋"
- "O que o João vai comer hoje?"
- Data curta ("ter, 21 de mai")

**Plano do dia** — 4 cards grandes empilhados (café, almoço, lanche, jantar):
- imagem/emoji + título da receita
- tempo + idade ("15 min · 8–12m")
- estado: pendente / servido (✓) / com feedback (😍🙂😣)
- ações rápidas no card: **Trocar** (gera outra sugestão para aquela refeição) e **Abrir**

Abaixo:
- Botão primário: **"Gerar sugestões do dia"** (regenera as 4 de uma vez, com nova seed)
- Botão secundário: **"Estou sem ideias agora"** → leva ao SOS

Removido da home: atalhos por refeição (redundantes), carrossel de rápidas, grid de idades. A home fica visualmente respirada — só o plano do dia.

### 3.2 SOS Refeição (`/sos`)

Lista de botões grandes (1 por linha), cada um filtra e abre receitas:

- ⏱ Tenho só 10 minutos
- 😣 Meu bebê rejeitou comida
- 🌿 Quero algo fácil
- 🧺 Só tenho poucos ingredientes
- 🌙 Preciso de jantar rápido

Cada botão leva a `/receitas` com filtros pré-aplicados (`quick`, `acceptance`, `meal=jantar`, etc.). O filtro de "poucos ingredientes" usa um novo campo `recipe.minimalIngredients: boolean` (≤5 itens).

### 3.3 Receita guiada (`/receitas/$id`)

Mantém estrutura atual, refina hierarquia:
- imagem grande
- tempo · idade · textura ideal (novo campo `texture`)
- ingredientes (lista limpa)
- preparo passo a passo (numerado, tipografia maior)
- 1–2 dicas curtas
- observações rápidas (alergênicos, substituições)

Rodapé fixo:
- **"Marcar como servido"** (primário, coral)
- Após marcar → aparece linha de feedback: amou 😍 / aceitou 🙂 / rejeitou 😣

### 3.4 Bebê (`/bebe`)

Funde Perfil + Favoritos + Histórico:
- cabeçalho do bebê (nome, idade, estilo)
- editar perfil
- **Últimas refeições** (10 mais recentes do histórico, com feedback)
- **Favoritas** (lista compacta)

### 3.5 Catálogo (`/receitas`) — secundário

Continua existindo como destino dos atalhos SOS e do "ver mais". Não aparece na bottom nav. Filtros existentes continuam.

---

## 4. Modelo de dados (localStorage)

Novos:

```ts
// rdb_daily_plan_v1
type DailyPlan = {
  date: string;            // YYYY-MM-DD
  babyName: string;        // invalidar se trocar bebê
  meals: Record<Meal, { recipeId: string; servedAt?: string; feedback?: "amou"|"aceitou"|"rejeitou" }>;
};

// rdb_history_v1
type HistoryEntry = {
  date: string;
  meal: Meal;
  recipeId: string;
  feedback?: "amou"|"aceitou"|"rejeitou";
};
```

Lógica:
- Ao abrir Home: se não houver plano de hoje, gerar a partir de `dailySuggestion` para cada refeição e salvar.
- "Trocar" sugestão: re-roda com seed alternativa (`date + meal + counter++`), atualiza só aquela refeição no plano.
- "Gerar sugestões do dia": sobrescreve todo o plano com nova seed.
- "Marcar como servido": grava `servedAt`. Feedback grava `feedback` no plano + adiciona entrada em `history`.

Recipe ganha 2 campos opcionais: `texture?: string` e `minimalIngredients?: boolean` (derivado de `ingredients.length <= 5`, calculado, não armazenado).

---

## 5. Design

Mantém tokens atuais (cream/sage/coral via oklch). Refinos:
- mais respiro vertical na home (cards 96–112px de altura mínima, gap-4)
- estado "servido" com check verde sálvia e leve fade
- micro-animações: fade-in dos cards, scale-95→100 ao tocar, transição suave ao trocar sugestão
- tipografia: títulos das refeições em Fraunces 20–22px, ingredientes/passos em Inter 16px com line-height generoso

---

## 6. Ordem de execução

1. Tipos + modelo de dados (`types.ts`, hooks `useDailyPlan`, `useHistory`)
2. Reestruturar bottom nav (3 itens) + nova rota `/sos` e `/bebe`
3. Reescrever Home como Plano do Dia
4. Adicionar "Marcar como servido" + feedback na tela de receita
5. Construir tela SOS (botões → filtros)
6. Construir tela Bebê (perfil + favoritos + histórico)
7. Polimento: animações, estados vazios, microcopy acolhedora

---

## O que NÃO entra agora

- paywall, assinatura, premium, bloqueios
- IA / geração dinâmica de receitas
- planejador semanal, lista de compras
- notificações, gamificação
- múltiplos bebês
- dashboard de nutrição

---

Quer que eu siga com este plano, ou prefere ajustar algo (ex: manter `/receitas` na bottom nav, mudar os botões do SOS, simplificar ainda mais a home)?
