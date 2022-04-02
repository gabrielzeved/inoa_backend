import { StockCandle } from "../domain/StockCandle";

export interface FinanceAPI {
  getStockCandles(
    symbol: string,
    to: number,
    from: number
  ): Promise<StockCandle>;
}
