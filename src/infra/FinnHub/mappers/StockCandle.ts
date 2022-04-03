import { StockCandle } from "../../../domain/StockCandle";
export const DataToStockCandleDomain = (data: any): StockCandle => {
  return {
    close: data.c,
    open: data.o,
    maximum: data.h,
    minimum: data.l,
    volume: data.v,
    timestamp: data.t,
  } as StockCandle;
};
