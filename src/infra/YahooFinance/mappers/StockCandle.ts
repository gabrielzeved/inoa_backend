import { StockCandle } from "../../../domain/StockCandle";
export const DataToStockCandleDomain = (data: any): StockCandle => {
  return {
    close: data.chart.result[0].indicators.quote[0].close,
    open: data.chart.result[0].indicators.quote[0].open,
    maximum: data.chart.result[0].indicators.quote[0].high,
    minimum: data.chart.result[0].indicators.quote[0].low,
    volume: data.chart.result[0].indicators.quote[0].volume,
    timestamp: data.chart.result[0].timestamp,
  } as StockCandle;
};
