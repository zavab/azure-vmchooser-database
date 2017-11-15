var jsonfile = require('./apipricing.json');
var disk = require('./disk.json');
var currency = require('./currency.json');
var offers = jsonfile.offers;

console.log("name,type,tier,size,region,price,MaxDataDiskSizeGB,MaxDataDiskIops,MaxDataDiskThroughputMBs,_id,price_USD,price_EUR,price_GBP,price_AUD,price_JPY,price_CAD,price_DKK,price_CHF,price_SEK,price_IDR,price_INR");

for(var offer in offers){
  var offername = offer.split("-");
  var tier = offername[0];
  var size = offername[1];
  if (tier == "transactions") {
    var size = tier;
    var tier = "standard";
  }
  var capacity = offers[offer].size;
  if (tier == "standard") {
    var throughput = 60;
    var iops = 500;
  } else {
    var throughput = offers[offer].speed;
    var iops = offers[offer].iops;
  }
  for(var price in offers[offer].prices) {
    if (price === undefined) {
      //console.log(picked);
    } else {
      if (capacity === undefined) {
      } else {
        var priceUSD = offers[offer].prices[price].value;
        var priceEUR = priceUSD * currency.rates.EUR;
        var priceGBP = priceUSD * currency.rates.GBP;
        var priceAUD = priceUSD * currency.rates.AUD;
        var priceJPY = priceUSD * currency.rates.JPY;
        var priceCAD = priceUSD * currency.rates.CAD;
        var priceDKK = priceUSD * currency.rates.DKK;
        var priceCHF = priceUSD * currency.rates.CHF;
        var priceSEK = priceUSD * currency.rates.SEK;
        var priceIDR = priceUSD * currency.rates.IDR;
        var priceINR = priceUSD * currency.rates.INR;
        var region = price;
        var name = "md-"+size+"-"+tier+"-"+price;
      console.log(name+",disk,"+tier+","+size+","+region+","+priceUSD+","+capacity+","+iops+","+throughput+","+name+","+priceUSD+","+priceEUR+","+priceGBP+","+priceAUD+","+priceJPY+","+priceCAD+","+priceDKK+","+priceCHF+","+priceSEK+","+priceIDR+","+priceINR);
      }
    }
  }
}
