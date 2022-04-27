import { StockCandle } from "../domain/StockCandle";
import { StockSearch } from "../domain/StockSearch";
export type Interval =
  | "1m"
  | "2m"
  | "5m"
  | "15m"
  | "30m"
  | "60m"
  | "1d"
  | "1wk"
  | "1mo";
export interface FinanceAPI {
  getStockCandles(
    symbol: string,
    from: number,
    to: number,
    interval: Interval
  ): Promise<StockCandle>;

  search(term: string): Promise<StockSearch>;
}
