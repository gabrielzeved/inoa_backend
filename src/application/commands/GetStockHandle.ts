import { FinanceAPI } from "infra/FinanceAPI";
import { inject, injectable } from "tsyringe";
import HttpException from "../../common/errors/HttpException";
import { ValidationSchema, Validator } from "../../utils/validator/Validator";

@injectable()
export class GetStockHandle {
  constructor(@inject("FinanceAPI") private financeApi: FinanceAPI) {}

  async getCandles(symbol: string, from: number, to: number) {
    const schema: ValidationSchema = {
      symbol: [Validator.required],
      from: [Validator.required, Validator.numeric],
      to: [Validator.required, Validator.numeric],
    };

    const dataset = {
      symbol: symbol,
      from: from,
      to: to,
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

    const candles = await this.financeApi.getStockCandles(
      dataset.symbol,
      dataset.to,
      dataset.from
    );

    return candles;
  }
}
