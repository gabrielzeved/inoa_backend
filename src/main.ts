import express from "express";
import cors from "cors";
require("dotenv").config();
import "reflect-metadata";
import { container } from "tsyringe";
import { Controller } from "./application/controller/Controller";
import { ErrorHandler } from "./application/middleware/ErrorHandler";
import { CacheAPI } from "./infra/CacheAPI";
import { FinanceAPI } from "./infra/FinanceAPI";
import { RedisApi } from "./infra/Redis/impl/Redis";
import { YahooFinance } from "./infra/YahooFinance/impl/YahooFinance";

container.registerSingleton<FinanceAPI>("FinanceAPI", YahooFinance);
container.registerSingleton<CacheAPI>("CacheAPI", RedisApi);

const controller = container.resolve(Controller);

const app = express();

app.use(cors());

app.use(controller.router);
app.use(ErrorHandler);

console.log("Running on port : " + process.env.PORT || 8080);
app.listen(process.env.PORT || 8080);
