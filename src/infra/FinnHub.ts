import axios, { AxiosRequestConfig } from "axios";
import { StockCandle } from "../domain/StockCandle";
import { FinanceAPI } from "./FinanceAPI";

export class FinnHub implements FinanceAPI {
  async getStockCandles(symbol: string, from: number, to: number) {
    const options: AxiosRequestConfig<StockCandle[]> = {
      method: "GET",
      url: `${process.env.ENDPOINT}/stock/candle`,
      params: {
        symbol,
        resolution: "D",
        from,
        to,
      },
      headers: {
        "X-Finnhub-Token": process.env.SECRET_API || "",
      },
    };
    const candles = (await axios.request<StockCandle[]>(options)).data;
    return candles;
  }
}
