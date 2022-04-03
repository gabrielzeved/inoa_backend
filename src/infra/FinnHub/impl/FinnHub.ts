import axios, { AxiosRequestConfig } from "axios";
import { injectable } from "tsyringe";
import { StockCandle } from "../../../domain/StockCandle";
import { FinanceAPI } from "../../FinanceAPI";
import { DataToStockCandleDomain } from "../mappers/StockCandle";

@injectable()
export class FinnHub implements FinanceAPI {
  async getStockCandles(symbol: string, from: number, to: number) {
    const options: AxiosRequestConfig<StockCandle> = {
      method: "GET",
      url: `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${process.env.SECRET_API}`,
    };

    const res = await axios.request<StockCandle>(options);
    const candles = res.data;
    return DataToStockCandleDomain(candles);
  }
}
