import express from "express";
require("dotenv").config();
import "reflect-metadata";
import { container } from "tsyringe";
import { Controller } from "./application/controller/Controller";
import { ErrorHandler } from "./application/middleware/ErrorHandler";
import { FinanceAPI } from "./infra/FinanceAPI";
import { FinnHub } from "./infra/FinnHub/impl/FinnHub";

container.registerSingleton<FinanceAPI>("FinanceAPI", FinnHub);
const controller = container.resolve(Controller);

const app = express();
app.use(controller.router);
app.use(ErrorHandler);

console.log("Running on port : " + process.env.PORT || 8080);
app.listen(process.env.PORT || 8080);
