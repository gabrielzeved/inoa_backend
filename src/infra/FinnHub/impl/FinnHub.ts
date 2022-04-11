import axios, { AxiosRequestConfig } from "axios";
import { injectable } from "tsyringe";
import { StockCandle } from "../../../domain/StockCandle";
import { StockSearch } from "../../../domain/StockSearch";
import { FinanceAPI } from "../../FinanceAPI";
import { DataToStockCandleDomain } from "../mappers/StockCandle";
import { DataToStockSearchDomain } from "../mappers/StockSearch";

@injectable()
export class FinnHub implements FinanceAPI {
  async search(term: string): Promise<StockSearch> {
    const options: AxiosRequestConfig<StockSearch> = {
      method: "GET",
      url: `https://finnhub.io/api/v1/search?q=${term}&token=${process.env.SECRET_API}`,
    };

    const res = await axios.request<StockSearch>(options);
    const results = res.data;
    return DataToStockSearchDomain(results);
  }

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
