var jsonfile = require('./backuppricing.json');
var currency = require('./currency.json');
var offers = jsonfile.offers;
var graduatedOffers = jsonfile.graduatedOffers;

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
    '_id'
);

// Backup service cost
var dimension = 'backup-instance';
for (var region in offers['backup'].prices) {
    var price = offers['backup'].prices[region];
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
    id = dimension + '-' + region;
    console.log(
        id + ',' +
        region + ',' +
        'backup' + ',' +
        dimension + ',' +
        offers['backup'].incrementalSizeGB + ',' +
        offers['backup'].discountedSizeGB + ',' +
        offers['backup'].discountedRate + ',' +
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
        id
    );
}

// Backup Storage cost
for (dimension in graduatedOffers) {
    for (region in graduatedOffers[dimension]) {
        priceUSD = graduatedOffers[dimension][region].prices[0].price.value;
        priceEUR = priceUSD * currency.eur.conversion;
        priceGBP = priceUSD * currency.gbp.conversion;
        priceAUD = priceUSD * currency.aud.conversion;
        priceJPY = priceUSD * currency.jpy.conversion;
        priceCAD = priceUSD * currency.cad.conversion;
        priceDKK = priceUSD * currency.dkk.conversion;
        priceCHF = priceUSD * currency.chf.conversion;
        priceSEK = priceUSD * currency.sek.conversion;
        priceIDR = priceUSD * currency.idr.conversion;
        priceINR = priceUSD * currency.inr.conversion;
        id = dimension + '-' + region;
        console.log(
            id + ',' +
            region + ',' +
            'backup' + ',' +
            dimension + ',' +
            '' + ',' +
            '' + ',' +
            '' + ',' +
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
            id
        );
    }
}