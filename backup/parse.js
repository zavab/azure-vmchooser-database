var jsonfile = require('./backup.json');
var currency = require('./currency.json');
var offers = jsonfile.offers;

console.log(
    'name,' +
    'region,' +
    'type,' +
    'dimension,' +
    'incrementalsize,' +
    'discountsize,' +
    'discountrate,' +
    'price,' +
    'price_USD,' +
    'price_EUR,' +
    'price_GBP,' +
    'price_AUD,' +
    'price_JPY,' +
    'price_CAD,' +
    'price_DKK,' +
    'price_CHF,' +
    'price_SEK,' +
    'price_IDR,' +
    'price_INR,' +
    'price_RUB,' +
    '_id'
);

// Backup cost
for (var offer in offers) {
    console.log(offer);
    if (offer === "backup") {
        dimension = "backup-instance";
    } else {
        dimension = offer;
    }
    for (var region in offers[offer].prices) {
        var price = offers[offer].prices[region];
        var priceUSD = price.value;
        var priceEUR = priceUSD * currency.eur.conversion;
        var priceGBP = priceUSD * currency.gbp.conversion;
        var priceAUD = priceUSD * currency.aud.conversion;
        var priceJPY = priceUSD * currency.jpy.conversion;
        var priceCAD = priceUSD * currency.cad.conversion;
        var priceDKK = priceUSD * currency.dkk.conversion;
        var priceCHF = priceUSD * currency.chf.conversion;
        var priceSEK = priceUSD * currency.sek.conversion;
        var priceIDR = priceUSD * currency.idr.conversion;
        var priceINR = priceUSD * currency.inr.conversion;
        var priceRUB = priceUSD * currency.rub.conversion;
        id = dimension + '-' + region;
        console.log(
            id + ',' +
            region + ',' +
            'backup' + ',' +
            dimension + ',' +
            offers[offer].incrementalSizeGB + ',' +
            offers[offer].discountedSizeGB + ',' +
            offers[offer].discountedRate + ',' +
            priceUSD + ',' +
            priceUSD + ',' +
            priceEUR + ',' +
            priceGBP + ',' +
            priceAUD + ',' +
            priceJPY + ',' +
            priceCAD + ',' +
            priceDKK + ',' +
            priceCHF + ',' +
            priceSEK + ',' +
            priceIDR + ',' +
            priceINR + ',' +
            priceRUB + ',' +
            id
        );
    }
}