var jsonfile = require('./openshift.json');
var currency = require('./currency.json');
console.log("_id,type,cores,contract,price_USD,price_EUR,price_GBP,price_AUD,price_JPY,price_CAD,price_DKK,price_CHF,price_SEK,price_IDR,price_INR,price_RUB");
var offers = jsonfile.offers;
for (var offer in offers) {
    if (offers[offer].pricingTypes === "WebDirect") {
            if (offers[offer]['prices'].hasOwnProperty("global")) {
                price = offers[offer]['prices']['global'].value
                var offername = offer.split("-");
                var type = offername[0];
                var cores = offername[1];
                var contract = offername[3];
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
                console.log(
                    offer + 
                    ",openshiftlicense," + 
                    cores + "," + 
                    contract + "," +  
                    price_USD + "," + 
                    price_EUR + "," + 
                    price_GBP + "," + 
                    price_AUD + "," + 
                    price_JPY + "," + 
                    price_CAD + "," + 
                    price_DKK + "," + 
                    price_CHF + "," + 
                    price_SEK + "," + 
                    price_IDR + "," + 
                    price_INR + "," + 
                    price_RUB
                )
            }
    }
}