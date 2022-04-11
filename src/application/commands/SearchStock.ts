import { FinanceAPI } from "infra/FinanceAPI";
import { inject, injectable } from "tsyringe";
import HttpException from "../../common/errors/HttpException";
import { CacheAPI } from "../../infra/CacheAPI";
import { ValidationSchema, Validator } from "../../utils/validator/Validator";

@injectable()
export class SearchStock {
  constructor(
    @inject("FinanceAPI") private financeApi: FinanceAPI,
    @inject("CacheAPI") private cacheApi: CacheAPI
  ) {}

  async search(term: string) {
    const schema: ValidationSchema = {
      term: [Validator.required],
    };

    const dataset = {
      term,
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

    const cachedInfo = await this.cacheApi.search(dataset.term);

    if (cachedInfo) {
      return cachedInfo;
    }

    const searchResults = await this.financeApi.search(dataset.term);

    this.cacheApi.saveSearch(dataset.term, searchResults);

    return searchResults;
  }
}
