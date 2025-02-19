import type { Game } from '../../model/Game';

export interface SaleResponse {
   count: number;
   results: Game[];
}