import { StockCandle } from "../domain/StockCandle";
import { StockSearch } from "../domain/StockSearch";

export interface FinanceAPI {
  getStockCandles(
    symbol: string,
    from: number,
    to: number
  ): Promise<StockCandle>;

  search(term: string): Promise<StockSearch>;
}
