import Redis from "ioredis";
import { StockCandle } from "../../../domain/StockCandle";
import { StockSearch } from "../../../domain/StockSearch";
import { CacheAPI } from "../../CacheAPI";
import { FinanceAPI, Interval } from "../../FinanceAPI";

export class RedisApi implements CacheAPI {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      port: 6379,
      host: "cache",
      username: "default",
      password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
      db: 0,
    });
  }
  async search(term: string): Promise<StockSearch | undefined> {
    const data = await this.redis.get(`search:${term}`);

    if (data) {
      const stockSearch = JSON.parse(data) as StockSearch;
      return stockSearch;
    }
    return undefined;
  }

  async saveSearch(term: string, data: StockSearch) {
    await this.redis.set(`search:${term}`, JSON.stringify(data), "EX", 1000);
  }

  async saveStockCandles(
    symbol: string,
    to: number,
    from: number,
    data: StockCandle,
    interval: Interval
  ) {
    await this.redis.set(
      `sc:${symbol}-${to}-${from}-${interval}`,
      JSON.stringify(data),
      "EX",
      1000
    );
  }

  async getStockCandles(
    symbol: string,
    from: number,
    to: number,
    interval: Interval
  ): Promise<StockCandle | undefined> {
    const data = await this.redis.get(`sc:${symbol}-${from}-${to}-${interval}`);

    if (data) {
      const stockCandle = JSON.parse(data) as StockCandle;
      return stockCandle;
    }
    return undefined;
  }
}
