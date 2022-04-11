import { StockCandle } from "../domain/StockCandle";
import { StockSearch } from "../domain/StockSearch";

export interface CacheAPI {
  getStockCandles(
    symbol: string,
    to: number,
    from: number
  ): Promise<StockCandle | undefined>;

  saveStockCandles(
    symbol: string,
    to: number,
    from: number,
    data: StockCandle
  ): void;

  search(term: string): Promise<StockSearch | undefined>;

  saveSearch(term: string, data: StockSearch): void;
}
