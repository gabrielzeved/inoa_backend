import { NextFunction, Request, Response } from "express";
import HttpException from "../../common/errors/HttpException";

export function ErrorHandler(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const errors = error.message || "Something went wrong";
  response.status(status).send({
    status,
    errors,
  });
}
