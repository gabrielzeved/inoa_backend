import { StockCandle } from "../domain/StockCandle";

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
}
