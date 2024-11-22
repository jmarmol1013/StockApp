interface OverviewStock {
    stockSymbol: string;
    currentPrice: number;
    volume: number;
    change: number;
    date: string;
}

type OverviewStocks = OverviewStock[];
