interface OverviewStock {
    stockSymbol: string;
    currentPrice: number;
    volume: number;
    change: number;
    date: string;
}

type OverviewStocks = OverviewStock[];

type StockDetail = {
    stockSymbol: string;
    stockHistory: HistoricalData[];
};

type AddStock = {
    stockSymbol: string;
    historicalData: HistoricalData;
};

type HistoricalData = {
    currentPrice: number;
    openingPrice: number;
    closingPrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
    date: string;
    change: number;
};

type UpdateStock = {
    currentPrice: number;
    openingPrice: number;
    closingPrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
};
