interface OverviewStock {
    StockSymbol: string;
    CurrentPrice: number;
    Volume: number;
    Change: number;
    Date: string;
}

type OverviewStocks = OverviewStock[];
