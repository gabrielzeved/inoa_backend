import { StockCandle } from "../domain/StockCandle";
import { StockSearch } from "../domain/StockSearch";
import { Interval } from "./FinanceAPI";

export interface CacheAPI {
  getStockCandles(
    symbol: string,
    to: number,
    from: number,
    interval: Interval
  ): Promise<StockCandle | undefined>;

  saveStockCandles(
    symbol: string,
    to: number,
    from: number,
    data: StockCandle,
    interval: Interval
  ): void;

  search(term: string): Promise<StockSearch | undefined>;

  saveSearch(term: string, data: StockSearch): void;
}
