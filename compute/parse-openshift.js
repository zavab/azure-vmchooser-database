var jsonfile = require('./openshift.json');
var currency = require('./currency.json');
console.log("_id,type,cores,contract,category,price_USD,price_EUR,price_GBP,price_AUD,price_JPY,price_CAD,price_DKK,price_CHF,price_SEK,price_IDR,price_INR,price_RUB");
var offers = jsonfile.offers;
for (var offer in offers) {
    if (offers[offer].pricingTypes === "WebDirect") {
            if (offers[offer]['prices'].hasOwnProperty("global")) {
                price = offers[offer]['prices']['global'].value
                var offername = offer.split("-");
                var type = offername[0];
                var cores = offername[1];
                var contract = offername[3];
                var category = offers[offer].category
                var price_USD = price.value;
                var price_EUR = price_USD * currency.eur.conversion;
                var price_GBP = price_USD * currency.gbp.conversion;
                var price_AUD = price_USD * currency.aud.conversion;
                var price_JPY = price_USD * currency.jpy.conversion;
                var price_CAD = price_USD * currency.cad.conversion;
                var price_DKK = price_USD * currency.dkk.conversion;
                var price_CHF = price_USD * currency.chf.conversion;
                var price_SEK = price_USD * currency.sek.conversion;
                var price_IDR = price_USD * currency.idr.conversion;
                var price_INR = price_USD * currency.inr.conversion;
                var price_RUB = price_USD * currency.rub.conversion;
                console.log(
                    offer + 
                    ",openshiftlicense," + 
                    cores + "," + 
                    contract + "," +  
                    category + "," +  
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