import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
// import Skeleton from 'react-loading-skeleton';

import { gameApiStore } from '../shared/stores/api/game-store/game-store';
import { tabsOptions } from '../shared/constants/tabs-options';
import { GameCard } from '../entities/game-card';
import { Tabs } from '../entities/tabs';
import s from './app.module.css';

export const App = observer(() => {
   const { getSaleAction, setType, games, isHasMore, type, dlcGames } = gameApiStore;

   useEffect(() => { getSaleAction() }, []);

   return (
      <main>
         <img
            className={s.image}
            src={'/xbox-preview.webp'}
            alt="xbox-preview"
            fetchPriority="high"
            draggable={false}
         />

         <div className={s.content}>
            <Tabs
               // disabled={dlcGames.length == 0}
               options={tabsOptions}
               activeOption={type}
               onChange={setType}
            />

            {games?.state === 'pending' && <></>}

            {(games?.state === 'fulfilled' && type == 'sale') && (
               <InfiniteScroll
                  loader={<></>}
                  className={s.games}
                  dataLength={games.value.length}
                  next={() => getSaleAction('pagination')}
                  hasMore={isHasMore}
               >
                  {games.value.map(game => (
                     <GameCard key={game.id} {...game} />
                  ))}
               </InfiniteScroll>
            )}

            {type == 'dlc' && (
               dlcGames.map(game => (
                  <GameCard key={game.id} {...game} />
               ))
            )}
         </div>
      </main>
   );
});
