var jsonfile = require('./sql.json');
var currency = require('./currency.json');
var offers = jsonfile.offers;

console.log(
    'name,' +
    'region,' +
    'type,' +
    'tier,' +
    'purchasemodel,' +
    'contract,' +
    'ahub,' +
    'compute,' +
    'cores,' +
    'memory,' +
    'maxstorage,' +
    'maxiops,' +
    'maxthroughput,' +
    'storage,' +
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

for (var offer in offers) {
    var offername = offer.split("-");
    var purchasemodel = offername[0];
    var type = offername[1];
    var compute = 'yes';
    var storage = 0;
    var cores = 0;
    var contract = 'payg';
    var ahub = 'no';
    var memory = 0;
    var maxstorage = 999999; //TB
    var maxiops = 0;
    var maxthroughput = 0;

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

    // Calculate Memory Sizes
    if (offername[4] === 'gen4') {
        memory = cores * 7;
    }
    if (offername[4] === 'gen5') {
        memory = cores * 5.5;
    }

    // Max Storage
    // - Single Database
    if (purchasemodel === 'single') {
        maxiops = cores * 250;
        if (maxiops > 7000) { maxiops = 7000; }
        maxthroughput = (maxiops * 64) / 1024;
        if (offername[4] === 'gen4') {
            if (cores < 4) { maxstorage = 1; }
            if (cores < 8) { maxstorage = 1.5; }
            if (cores === 8) { maxstorage = 3; }
            if (cores > 8) { maxstorage = 4; }
        }
        if (offername[4] === 'gen5') {
            if (cores < 8) { maxstorage = 1; }
            if (cores === 8) { maxstorage = 1.5; }
            if (cores < 24) { maxstorage = 3; }
            if (cores >= 24) { maxstorage = 4; }
        }
    }
    // - Elastic Database
    if (purchasemodel === 'elastic') {
        if (offername[4] === 'gen4' & offername[2] === 'general') {
            maxiops = cores * 500;
            if (maxiops > 7000) { maxiops = 7000; }
            maxthroughput = (maxiops * 64) / 1024;
            if (cores === 1) { maxstorage = 0.5; }
            if (cores === 2) { maxstorage = 0.75; }
            if (cores === 4) { maxstorage = 1.5; }
            if (cores === 8) { maxstorage = 2; }
            if (cores === 16) { maxstorage = 3.5; }
            if (cores === 24) { maxstorage = 3; }
        }
        if (offername[4] === 'gen5' & offername[2] === 'general') {
            maxiops = cores * 250;
            if (maxiops > 7000) { maxiops = 7000; }
            maxthroughput = (maxiops * 64) / 1024;
            if (cores === 2) { maxstorage = 0.5; }
            if (cores === 4) { maxstorage = 0.75; }
            if (cores === 8) { maxstorage = 1.5; }
            if (cores === 16) { maxstorage = 2; }
            if (cores === 24) { maxstorage = 3; }
            if (cores === 32) { maxstorage = 4; }	
        }
        if (offername[4] === 'gen4' & offername[2] === 'business') {
            maxiops = cores * 5000;
            if (maxiops > 80000) { maxiops = 80000; }
            maxthroughput = cores * 125;
            maxstorage = cores;
        }
        if (offername[4] === 'gen5' & offername[2] === 'business') {
            maxiops = cores * 2500;
            maxthroughput = cores * (125 / 2);
            maxstorage = cores / 2;
        }
    }
    // - Managed Instances
    if (offername[2] === 'general' && purchasemodel === 'managed') {
        maxstorage = 8;
        maxiops = 5000 * 8;
        maxthroughput = 125 * 8;
    }
    if (offername[2] === 'business' && purchasemodel === 'managed') {
        if (offername[4] === 'gen4') {
            maxstorage = 1;
            maxiops = 5000 * 1;
            maxthroughput = 125 * 1;
        }
        if (offername[4] === 'gen5') {
            if (cores < 24) {
                maxstorage = 1;
                maxiops = 5000 * 1;
                maxthroughput = 125 * 1;
            }
            if (cores < 32) {
                maxstorage = 2;
                maxiops = 5000 * 2;
                maxthroughput = 125 * 2;
            }
            if (cores < 81) {
                maxstorage = 4;
                maxiops = 5000 * 4;
                maxthroughput = 125 * 4;
            }
        }
    }
    // Convert max storage from TB to GB
    maxstorage = maxstorage * 1024;

    // Storage Related
    if (offername[2] === "operations") {
        tier = offername[2];
    }

    // Contract Options
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
            var priceRUB = priceUSD * currency.rub.conversion;
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
                memory + ',' +
                maxstorage + ',' +
                maxiops + ',' +
                maxthroughput + ',' +
                storage + ',' +
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

}