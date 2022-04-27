import { StockCandle } from "../../../domain/StockCandle";
export const DataToStockCandleDomain = (data: any): StockCandle => {
  return {
    close: data.chart.result[0].indicators.quote[0].close.filter(
      (element: any) => element
    ),
    open: data.chart.result[0].indicators.quote[0].open.filter(
      (element: any) => element
    ),
    maximum: data.chart.result[0].indicators.quote[0].high.filter(
      (element: any) => element
    ),
    minimum: data.chart.result[0].indicators.quote[0].low.filter(
      (element: any) => element
    ),
    volume: data.chart.result[0].indicators.quote[0].volume.filter(
      (element: any) => element
    ),
    timestamp: data.chart.result[0].timestamp.filter((element: any) => element),
  } as StockCandle;
};
