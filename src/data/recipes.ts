import type { Recipe } from "@/lib/types";
import { pureMandioquinhaFrango } from "./recipes/pure-mandioquinha-frango";
import { papaBananaAveia } from "./recipes/papa-banana-aveia";
import { mingauMacaAveia } from "./recipes/mingau-maca-aveia";
import { panquequinhaBananaBebe } from "./recipes/panquequinha-banana-bebe";
import { mamaoChiaBanana } from "./recipes/mamao-chia-banana";
import { cremeAbacateBanana } from "./recipes/creme-abacate-banana";
import { cuscuzOvoMexido } from "./recipes/cuscuz-ovo-mexido";

export const recipes: Recipe[] = [
  pureMandioquinhaFrango,
  papaBananaAveia,
  mingauMacaAveia,
  panquequinhaBananaBebe,
  mamaoChiaBanana,
  cremeAbacateBanana,
  cuscuzOvoMexido,
];
