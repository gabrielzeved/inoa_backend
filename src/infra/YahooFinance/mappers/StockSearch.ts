import { StockSearch, StockSearchElement } from "../../../domain/StockSearch";

export const DataToStockSearchDomain = (data: any): StockSearch => {
  const elements = (data.quotes as any[])?.reduce<StockSearchElement[]>(
    (prev, curr) => {
      return [
        ...prev,
        {
          symbol: curr.symbol,
          name: curr.shortname,
        },
      ];
    },
    []
  );
  return {
    elements,
  };
};
