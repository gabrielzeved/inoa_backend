import { GetStockHandle } from "../commands/GetStockHandle";
import { NextFunction, Request, Response, Router } from "express";
import { container, injectable } from "tsyringe";
import HttpException from "../../common/errors/HttpException";

@injectable()
export class Controller {
  public router: Router = Router();

  constructor() {
    this.router.get("/", this.getCandles.bind(this));
  }

  async getCandles(req: Request, res: Response, next: NextFunction) {
    const dataset = {
      symbol: req.query.symbol as string,
      from: req.query.from as any,
      to: req.query.to as any,
    };

    const instance = container.resolve(GetStockHandle);

    try {
      const candles = await instance.getCandles(
        dataset.symbol,
        dataset.from,
        dataset.to
      );
      res.send(JSON.stringify(candles));
    } catch (e) {
      next(e);
    }
  }
}
