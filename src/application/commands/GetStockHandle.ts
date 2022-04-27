import { FinanceAPI, Interval } from "infra/FinanceAPI";
import { inject, injectable } from "tsyringe";
import HttpException from "../../common/errors/HttpException";
import { CacheAPI } from "../../infra/CacheAPI";
import { ValidationSchema, Validator } from "../../utils/validator/Validator";

@injectable()
export class GetStockHandle {
  constructor(
    @inject("FinanceAPI") private financeApi: FinanceAPI,
    @inject("CacheAPI") private cacheApi: CacheAPI
  ) {}

  async getCandles(
    symbol: string,
    from: number,
    to: number,
    interval: Interval
  ) {
    const schema: ValidationSchema = {
      symbol: [Validator.required],
      from: [Validator.required, Validator.numeric],
      to: [Validator.required, Validator.numeric],
      interval: [Validator.required],
    };

    const dataset = {
      symbol: symbol,
      from: from,
      to: to,
      interval: interval,
    };

    const results = new Validator(dataset, schema).validate();

    if (!Validator.isValid(results)) {
      const messages = results
        .filter((item) => !item.valid)
        .map((item) => {
          return {
            message: item.message,
            key: item.key,
          };
        });
      throw new HttpException(400, messages);
    }

    const cachedInfo = await this.cacheApi.getStockCandles(
      dataset.symbol,
      dataset.from,
      dataset.to,
      dataset.interval
    );

    if (cachedInfo) {
      return cachedInfo;
    }

    const candles = await this.financeApi.getStockCandles(
      dataset.symbol,
      dataset.from,
      dataset.to,
      dataset.interval
    );

    this.cacheApi.saveStockCandles(
      dataset.symbol,
      dataset.from,
      dataset.to,
      candles,
      dataset.interval
    );

    return candles;
  }
}
