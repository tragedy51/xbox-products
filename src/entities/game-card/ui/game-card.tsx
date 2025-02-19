import type { Game } from '../../../shared/model/Game';
import s from './game-card.module.css';

export const GameCard = (p: Game) => {
   let obj = {} as Game['prices'][number];

   if (Array.isArray(p.prices)) obj = p.prices[0];

   return (
      <div className={s.game}>
         <img
            className={s.image}
            src={p.image_url}
            alt="game-image"
            height={192}
         />

         <div className={s.content}>
            <h2 className={s.title}>{p.game_name}</h2>

            {(obj.game_key || obj.discount_percentage) && (
               <div className={s.firstprice}>
                  {obj.game_key && <p>Ключ - {obj.game_key}р</p>}
                  {obj.discount_percentage && (
                     <div className={s.discount}>
                        <p>-{obj.discount_percentage}%</p>
                     </div>
                  )}
               </div>
            )}

            {obj.your_acc && <p>Ваш аккаунт - {obj.your_acc}р</p>}
            {obj.new_acc && <p>Новый аккаунт - {obj.new_acc}р</p>}

            <a
               className={s.buy}
               target="_blank"
               href="https://t.me/XboxRentSupport"
            >
               Купить
            </a>
         </div>
      </div>
   );
};
