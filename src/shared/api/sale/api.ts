import type { SaleResponse } from './types';

export const getSale = async (
   offset: number,
   limit: number
) => {
   const params = new URLSearchParams({ offset: offset.toString(), limit: limit.toString() });
   const res = await fetch(import.meta.env.VITE_API_URL + `games/sales?${params.toString()}`);

   if (!res.ok) throw Error("Something went wrong");

   const data: SaleResponse = await res.json();

   return data;
}