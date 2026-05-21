
# Receitas do Bebê — Arquitetura do MVP

App mobile-first, premium, que responde uma única pergunta: **"O que eu preparo para meu bebê hoje?"**. Posicionamento: assistente, não catálogo.

---

## 1. Princípios de produto (guard-rails)

- **20 segundos até a decisão.** Da abertura do app até "vou fazer isso aqui".
- **Personalização visível desde o primeiro segundo** (nome do bebê, idade, restrições aparecem na Home).
- **Acolhimento na copy.** Nunca culpar. Frases curtas, calorosas.
- **Subtração > adição.** Cada elemento precisa responder: *"isso ajuda a mãe a decidir mais rápido?"*. Se não, fora.
- **Premium silencioso.** Muito espaço em branco, tipografia confiante, micro-interações sutis, zero "cara de app infantil".

---

## 2. Design system

**Paleta (tokens em `src/styles.css` via oklch):**
- `--background`: creme suave (off-white quente)
- `--card`: branco puro
- `--foreground`: cinza-grafite quente (não preto)
- `--muted`: bege claro
- `--primary`: verde-sálvia suave (elementos calmos, idade, tags)
- `--accent` / CTA: coral suave (usado com parcimônia, só em ações principais)
- `--border`: bege muito claro

**Tipografia:** par moderno e acolhedor — `Fraunces` (display, headings emocionais) + `Inter` (UI/body). Headings com tracking levemente negativo.

**Componentes-base:** cards com `radius-2xl`, sombras quase imperceptíveis, ícones lineares (lucide), sem gradientes berrantes, sem emojis decorativos espalhados (emojis só como sinal funcional: 💛 na saudação, ícones de refeição).

---

## 3. Arquitetura de rotas (TanStack Start, mobile-first)

```
src/routes/
  __root.tsx                 layout global (sem chrome) — só Outlet + providers
  index.tsx                  redireciona: se onboarding incompleto → /onboarding, senão → /home
  onboarding.tsx             fluxo em etapas (sem bottom nav)
  _app.tsx                   layout com bottom nav (pathless)
    _app/home.tsx            Home (assistente)
    _app/receitas.tsx        Lista + filtros
    _app/receitas.$id.tsx    Detalhe da receita
    _app/idades.tsx          Receitas por faixa etária (acessível pela Home e Receitas)
    _app/favoritos.tsx
    _app/perfil.tsx
```

Persistência do MVP: **localStorage** (perfil do bebê, favoritos, flag de onboarding). Estrutura tipada pensando em migrar para Lovable Cloud depois, sem implementar agora.

```ts
type BabyProfile = {
  name: string;
  birthMonth: string;           // ISO — derivamos idade dinamicamente
  feedingStyle: 'tradicional' | 'blw' | 'misto';
  restrictions: ('sem_ovo'|'sem_leite'|'sem_gluten'|'vegetariano')[];
};
```

Dados de receitas: arquivo TS estático (`src/data/recipes.ts`) com ~25–30 receitas curadas cobrindo as 4 refeições × faixas etárias × restrições. Suficiente para validação; trocável por backend depois.

---

## 4. Fluxo das telas

```text
            ┌──────────────┐
   abrir →  │  index.tsx   │  checa localStorage
            └──────┬───────┘
                   │
        primeiro acesso?
           sim │        │ não
               ▼        ▼
        /onboarding   /home
               │
               └──── salva perfil ──► /home

   Bottom nav (sempre visível em _app):
   [ Home ] [ Receitas ] [ Favoritos ] [ Perfil ]

   Home ──► card de sugestão ──► /receitas/$id
        ──► atalho refeição    ──► /receitas?meal=almoco
        ──► "rejeita comida"   ──► /receitas?tag=aceitacao
        ──► "rápidas"          ──► /receitas?tag=rapida
        ──► faixa etária       ──► /idades
```

---

## 5. Wireframes mentais (mobile, 390px)

### 5.1 Onboarding (4 telas, ~60s)

```
┌───────────────────────────┐
│                           │
│   💛                       │
│   Vamos personalizar      │
│   tudo para o seu bebê    │
│                           │
│   [ Começar ]   ← coral   │
└───────────────────────────┘
```
Etapas: **Nome do bebê → Idade (date picker mês/ano) → Tipo de alimentação (3 cards grandes) → Restrições (chips multi-select, opcional)** → tela final "Tudo pronto, [Nome] 💛".

Barra de progresso fina no topo. Botão "Pular" só na tela de restrições.

### 5.2 Home — a tela mais importante

```
┌───────────────────────────┐
│ Bom dia, Ana 💛           │  ← Fraunces, grande
│ O que o João vai comer    │
│ hoje?                     │  ← muted
│                           │
│ [🥣] [🍲] [🍌] [🍛]        │  ← 4 atalhos grandes, grid 2x2 ou row
│ Café  Almoço Lanche Jantar│
│                           │
│ ─────────────────────     │
│ Sem ideias hoje?          │  ← headline acolhedora
│                           │
│ ┌─────────────────────┐   │
│ │ ☕ CAFÉ DA MANHÃ     │   │  ← 3 cards verticais empilhados
│ │ Papa de banana      │   │     (não carrossel — zero fricção)
│ │ com aveia           │   │
│ │ 10 min · 8m+        │   │
│ └─────────────────────┘   │
│ ┌─────────────────────┐   │
│ │ 🍲 ALMOÇO ...        │   │
│ └─────────────────────┘   │
│ ┌─────────────────────┐   │
│ │ 🍌 LANCHE ...        │   │
│ └─────────────────────┘   │
│                           │
│ [ Meu bebê rejeita comida]│  ← botão ghost, tom acolhedor
│                           │
│ Receitas rápidas    ver → │
│ ◄ [card] [card] [card] ►  │  ← carrossel horizontal Netflix-style
│                           │
│ Por idade do João         │
│ ◄ [6-8m][8-12m][1-2a] ►   │
└───────────────────────────┘
  [Home] [Receitas] [♥] [👤]
```

As 3 sugestões do dia são **determinísticas por dia + perfil** (hash da data + idade + restrições → seleciona da lista). Mesma mãe vê as mesmas sugestões ao longo do dia — sensação de "alguém pensou nisso por mim", não de feed aleatório.

### 5.3 Receitas (lista)

Header com search opcional escondido (ícone), chips de filtro horizontais: `Idade do bebê` (default) · `BLW` · `Rápida` · `Sem leite` · `Sem ovo` · `Sem glúten`. Tabs de refeição no topo. Grid de 2 colunas com cards-foto. Sem paginação — lista curta.

### 5.4 Detalhe da receita

```
┌───────────────────────────┐
│ [foto grande 1:1]   ♥     │
│                           │
│ Purê de mandioquinha      │  ← Fraunces
│ com frango                │
│ ⏱ 20 min · 8m+ · BLW ok   │
│                           │
│ Ingredientes              │
│ • ...                     │
│ • ...                     │
│                           │
│ Modo de preparo           │
│ 1. ...                    │
│ 2. ...                    │
│                           │
│ 💡 Dica da introdução     │  ← 1–2 linhas, sem texto técnico
└───────────────────────────┘
```

### 5.5 Idades

Hero com idade atual do bebê destacada, 4 cards grandes (6–8m, 8–12m, 1–2a, 2–3a) com micro-descrição ("texturas amassadas, sabores suaves"). Toque → lista filtrada.

### 5.6 Favoritos

Vazio: ilustração leve + "Toque no ♥ para guardar receitas que o João amou". Preenchido: mesma grid de Receitas.

### 5.7 Perfil

Lista editável: foto/avatar opcional, nome, idade, tipo de alimentação, restrições. Rodapé discreto: "Em breve: mais de um bebê" (sinaliza expansão sem implementar).

---

## 6. O que NÃO vai no MVP

Assinatura, IA, planejador semanal, lista de compras, gamificação, múltiplos perfis, notificações, dashboard, busca avançada. Tipos preparados para múltiplos bebês (`BabyProfile[]` no storage, mas UI single).

---

## Detalhes técnicos

- **Stack:** TanStack Start já configurado. Rotas conforme seção 3. Sem libs novas além de `date-fns` para idade do bebê.
- **Tokens:** definidos em `src/styles.css` em oklch; nada de cores hardcoded em componentes. Variants de botão: `primary` (coral), `soft` (verde-sálvia), `ghost`.
- **Tipografia:** importar Fraunces + Inter via `<link>` no `__root.tsx` head.
- **Imagens:** gerar ~10–15 imagens de receitas (premium, fundo claro, food-styling editorial) com imagegen e salvar em `src/assets/recipes/`.
- **Estado:** hook `useBabyProfile()` lendo/escrevendo localStorage; hook `useFavorites()` idem; helper `getDailySuggestions(profile, date)` puro.
- **Engine de sugestões:** filtra `recipes` por idade + restrições, agrupa por refeição, escolhe deterministicamente por seed `YYYY-MM-DD + babyId`.
- **Bottom nav:** componente próprio em `_app.tsx`, fixo no rodapé com safe-area inset.
- **SEO/head:** cada rota com `head()` próprio (título, description, og).

---

## Plano de execução (após sua aprovação)

1. Tokens + tipografia + base do design system.
2. Estrutura de rotas (`__root`, `_app`, bottom nav, redirecionador no `index`).
3. Onboarding (4 etapas) + persistência do perfil.
4. Dados de receitas + imagens geradas + engine de sugestões.
5. Home (hero personalizada, atalhos, 3 sugestões, "rejeita comida", rápidas, por idade).
6. Lista de Receitas + filtros + Detalhe.
7. Idades + Favoritos + Perfil.
8. Polimento: micro-interações, vazios, copy, QA mobile 390px.

Quer que eu siga com esse plano ou ajusto algum ponto (paleta, ordem, conteúdo de alguma tela)?
