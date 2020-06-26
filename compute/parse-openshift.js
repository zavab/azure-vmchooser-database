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
                var price_USD = price.value;
                var price_EUR = priceUSD * currency.eur.conversion;
                var price_GBP = priceUSD * currency.gbp.conversion;
                var price_AUD = priceUSD * currency.aud.conversion;
                var price_JPY = priceUSD * currency.jpy.conversion;
                var price_CAD = priceUSD * currency.cad.conversion;
                var price_DKK = priceUSD * currency.dkk.conversion;
                var price_CHF = priceUSD * currency.chf.conversion;
                var price_SEK = priceUSD * currency.sek.conversion;
                var price_IDR = priceUSD * currency.idr.conversion;
                var price_INR = priceUSD * currency.inr.conversion;
                var price_RUB = priceUSD * currency.rub.conversion;
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