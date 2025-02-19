import { makeAutoObservable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

import type { Game } from '../../../model/Game';
import { getSale } from '../../../api/sale/api';
import type { GameReqType } from './types';

class GameApiStore {
   constructor() { makeAutoObservable(this) }

   // ============ STATES ============
   limit = 10;
   offset = 0;
   isHasMore = false;
   isPagination = false;
   type: GameReqType = "sale";
   games: IPromiseBasedObservable<Game[]> | null = null;
   dlcGames: Game[] = [];

   // ============ FETCHES ============
   getSaleAction = async (type?: string) => {
      try {
         if (type === 'pagination') {
            this.incrementOffset();
            this.setIsPagination(true);
         }

         const promise = getSale(this.offset, this.limit).then(({ count, results }) => {
            // @ts-ignore
            this.setIsHasMore(count > results.length + (this.games?.value?.length || 0));

            const dlcArr = results.filter(game => game.dlc !== '');
            this.setDlcGames(dlcArr);

            return results.filter(game => game.dlc === "");
         });

         if (type === 'pagination' && this.games)
            // @ts-ignore
            this.games = fromPromise(Promise.resolve([...this.games.value, ...await promise]));
         else this.games = fromPromise(promise);
      }
      catch (e) { console.log(e) }
      finally { if (type === 'pagination') this.setIsPagination(false) }
   }

   // ============ OTHER MOVES ============
   setIsPagination = (val: boolean) => this.isPagination = val;
   setType = (type: GameReqType) => this.type = type;
   setIsHasMore = (val: boolean) => this.isHasMore = val;
   setDlcGames = (games: Game[]) => this.dlcGames = games;
   incrementOffset = () => this.offset += this.limit;
}

export const gameApiStore = new GameApiStore();
