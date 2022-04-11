import { StockCandle } from "../domain/StockCandle";
import { StockSearch } from "../domain/StockSearch";

export interface FinanceAPI {
  getStockCandles(
    symbol: string,
    to: number,
    from: number
  ): Promise<StockCandle>;

  search(term: string): Promise<StockSearch>;
}
