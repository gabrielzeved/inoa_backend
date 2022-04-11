export interface StockSearch {
  elements: StockSearchElement[];
}

export interface StockSearchElement {
  symbol: string;
  name: string;
}
