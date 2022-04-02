import { Request, Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import { FinanceAPI } from "../../infra/FinanceAPI";

@injectable()
export class Controller {
  public router: Router = Router();

  constructor(@inject("FinanceAPI") private financeApi: FinanceAPI) {
    this.router.get("/", this.getCandles.bind(this));
  }

  async getCandles(req: Request, res: Response) {
    const symbol = req.query.symbol as string;
    const from = +(req.query.from as string);
    const to = +(req.query.to as string);

    if (!symbol) {
      res
        .status(400)
        .send(" 'symbol' query variable is necessary for this search");
      return;
    }
    if (!from) {
      res
        .status(400)
        .send(" 'from' query variable is necessary for this search");
      return;
    }
    if (!to) {
      res.status(400).send(" 'to' query variable is necessary for this search");
      return;
    }

    const candles = await this.financeApi.getStockCandles(symbol, to, from);
    res.send(JSON.stringify(candles));
  }
}
