
var Loops = {
    stock: null,
    counter: null,
    symbols: [],
    expensiveStocks: [],

    items: [
        { symbol: "XFX", price: 240.22, volume: 23432 },
        { symbol: "TNZ", price: 332.19, volume: 234 },
        { symbol: "JXJ", price: 120.22, volume: 5323 },
    ],
    getStockSymbolsFor: function (stocks) {
        for (Loops.counter = 0; Loops.counter < stocks.length; Loops.counter++) {
            Loops.stock = stocks[Loops.counter];
            Loops.symbols.push(Loops.stock.symbol);
        }
        return Loops.symbols;
    },

    whileLoop: function () {
        var names = ['Adela', 'Daniel', 'Oliver'];
        var x = 0;

        do {
            console.log(names[x]);
            x++;
        } while (x < names.length);

        while (x < 5) {
            console.log(x++) // 1 2 3 4
        }
    },

    // forEach unlike for loop can run asynchronously
    getStockSymbolsForEach: function (stocks) {
        stocks.forEach(function (stock) {
            Loops.symbols.push(stock.symbol);
        });
        return Loops.symbols;
    },

    // great for transformations for every item in the array
    getStockSymbolsMap: function (stocks) {
        return stocks.map(function (stock) {
            Loops.symbols.push(stock.symbol);
        });
    },

    getStocksOverEach: function (stocks, minPrice) {
        stocks.forEach(function (stock) {
            if (stock.price >= minPrice) {
                Loops.expensiveStocks.push(stock);
            }
        });
        return Loops.expensiveStocks;
    },

    getStocksOverFilter: function (stocks, minPrice) {
        return stocks.filter(function (stock) {
            return stock.price >= minPrice;
        });
    },

    init: function () {
        Loops.getStockSymbolsMap(Loops.items);
        Loops.getStocksOverFilter(Loops.items, 150.00);
        // 		console.log(JSON.stringify(Loops.symbols));
        // 		console.log(JSON.stringify(Loops.expensiveStocks));
        console.log(JSON.stringify(Loops.getStocksOverFilter(Loops.items, 150.00)));
    }
};

Loops.init();
