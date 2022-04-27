import axios, { AxiosRequestConfig } from "axios";
import { injectable } from "tsyringe";
import { StockCandle } from "../../../domain/StockCandle";
import { StockSearch } from "../../../domain/StockSearch";
import { FinanceAPI, Interval } from "../../FinanceAPI";
import { DataToStockCandleDomain } from "../mappers/StockCandle";
import { DataToStockSearchDomain } from "../mappers/StockSearch";

@injectable()
export class YahooFinance implements FinanceAPI {
  async search(term: string): Promise<StockSearch> {
    const options: AxiosRequestConfig<StockSearch> = {
      method: "GET",
      url: `https://yh-finance.p.rapidapi.com/auto-complete`,
      params: { q: term, region: "BR" },
      headers: {
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
        "X-RapidAPI-Key": "f173f8e6a3msh2db64c2e31c5588p128025jsn2a29343cc8c1",
      },
    };

    const res = await axios.request<StockSearch>(options);
    const results = res.data;

    return DataToStockSearchDomain(results);
  }

  async getStockCandles(
    symbol: string,
    from: number,
    to: number,
    interval: Interval
  ) {
    const options: AxiosRequestConfig<StockCandle> = {
      method: "GET",
      url: `https://yh-finance.p.rapidapi.com/stock/v3/get-chart`,
      params: {
        interval: interval,
        symbol: symbol,
        region: "BR",
        period1: from,
        period2: to,
      },
      headers: {
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
        "X-RapidAPI-Key": "f173f8e6a3msh2db64c2e31c5588p128025jsn2a29343cc8c1",
      },
    };

    const res = await axios.request<StockCandle>(options);
    const candles = res.data;
    return DataToStockCandleDomain(candles);
  }
}
