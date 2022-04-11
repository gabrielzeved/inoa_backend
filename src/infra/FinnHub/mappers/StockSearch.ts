import { StockSearch, StockSearchElement } from "../../../domain/StockSearch";

export const DataToStockSearchDomain = (data: any): StockSearch => {
  const elements = (data.result as any[]).reduce<StockSearchElement[]>(
    (prev, curr) => {
      return [
        ...prev,
        {
          symbol: curr.symbol,
          name: curr.description,
        },
      ];
    },
    []
  );
  return {
    elements,
  };
};
