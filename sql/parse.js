var jsonfile = require('./sqlpricing.json');
var currency = require('./currency.json');
var offers = jsonfile.offers;

console.log(
    'offer,' +
    'region,' +
    'type,' +
    'tier,' +
    'purchasemodel,' +
    'contract,' +
    'ahub,' +
    'compute,' +
    'cores,' +
    'storage,' +
    'priceUSD,' +
    'priceEUR,' +
    'priceGBP,' +
    'priceAUD,' +
    'priceJPY,' +
    'priceCAD,' +
    'priceDKK,' +
    'priceCHF,' +
    'priceSEK,' +
    'priceIDR,' +
    'priceINR,' +
    'vmid'
);

for (var offer in offers) {
    var offername = offer.split("-");
    var purchasemodel = offername[0];
    var type = offername[1];
    var compute = 'yes';
    var storage = 0;
    var cores = 0;
    var contract = 'payg';
    var ahub = 'no';

    if (type !== 'vcore' && type !== 'dtu' && type !== 'storage') {
        console.log('Unknown type!');
        console.log(offer);
    }

    if (type === 'vcore' && purchasemodel === 'managed') {
        var tier = offername[2];
        if (tier !== 'general' && tier !== 'business') {
            tier = 'storage';
        } else {            
            tier = offername[2] + '-' + offername[3];
        }
    }

    if (type === 'vcore' && purchasemodel === 'elastic') {
        tier = offername[2] + '-' + offername[3] + '-' + offername[4];
    }

    if (type === 'vcore' && purchasemodel === 'single') {
        tier = offername[2] + '-' + offername[3] + '-' + offername[4];
    }

    if (offername[4] !== 'gen4' && offername[4] !== 'gen5') {
        compute = 'no';
        storage = '1';
    } else {
        cores = offers[offer].cores;
        if (purchasemodel === 'managed') {
            storage = offers[offer].storage;
        }
    }

    if (offername[2] === "operations") {
        tier = offername[2];
    }

    if (offername[8] === 'hybrid' || offername[11] === 'hybrid') {
        ahub = 'yes';
    }

    if (offername[10] === 'reserved' && offername[8] === 'one') {
        contract = 'ri1y';
    }

    if (offername[10] === 'reserved' && offername[8] === 'three') {
        contract = 'ri3y';
    }

    if (type === 'vcore') {
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
            id = 'sql-' + offer + '-' + region
            console.log(
                offer + ',' +
                region + ',' +
                'sql-' + type + ',' +
                tier + ',' +
                purchasemodel + ',' +
                contract + ',' +
                ahub + ',' +
                compute + ',' +
                cores + ',' +
                storage + ',' +
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

}