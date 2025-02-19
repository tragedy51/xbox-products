interface Price {
   game_key: number;
   your_acc: number;
   new_acc: number;
   discount_percentage: string;
}

export interface Game {
   id: number;
   dlc: string;
   image_url: string;
   game_name: string;
   prices: Price[];
}