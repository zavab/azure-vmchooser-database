var jsonfile = require('./apipricing.json');
var reference = require('./referencedata.json');
var referencessd = require('./referencedata-ssd.json');
var currency = require('./currency.json');
var offers = jsonfile.offers;

console.log("name,tier,cores,pcores,mem,region,price,ACU,SSD,MaxNics,Bandwidth,MaxDataDiskCount,MaxDataDiskSizeGB,MaxDataDiskIops,MaxDataDiskThroughputMBs,MaxVmIops,MaxVmThroughputMBs,ResourceDiskSizeInMB,TempDiskSizeInGB,TempDiskIops,TempDiskReadMBs,TempDiskWriteMBs,SAPS2T,SAPS3T,HANA,Hyperthreaded,OfferName,_id,price_USD,price_EUR,price_GBP,price_AUD,price_JPY,price_CAD,price_DKK,price_CHF,price_SEK,price_IDR");

for(var offer in offers){
  if(offer.indexOf("linux") > -1) {
    var offername = offer.split("-");
    var name = offername[1];
    var tier = offername[2];
    var cores = offers[offer].cores;
    var mem = offers[offer].ram;
    if(offer.indexOf("lowpriority") > -1) {
      var filtertier = "standard";
    } else {
      var filtertier = tier;
    }
    if(offer.indexOf("promo") > -1) {
      //console.log("Skipping promo offer : "+offer);
    } else {
      for(var price in offers[offer].prices) {
        var region = price;
        var price = offers[offer].prices[price];
        var filter = filtertier+"_"+name;
        var lookup = reference.filter(function(value){ return value.Name==filter;});
        var picked = lookup[0];
	var pcores = cores;
	var vmid = offer+"-"+region;

        if (picked === undefined) {
          //console.log(picked);
        } else {
	  if(picked.hasOwnProperty("BaseCpuPerformancePct")){
	    var pcores = picked.BaseCpuPerformancePct / pcores;
            // calculating the base performance for systems like the B-series
	  }
	  if(picked.Hyperthreaded.indexOf("Yes") > -1) {
            var pcores = pcores * 1.3 / 2;
	    // A hyperthreaded core gains 30% compared to a single threaded. So 130% performance for two vCPU's, is an equivalent of 65% of a physical core.
          }
          var priceUSD = price.value;
          var priceEUR = price.value * currency.rates.EUR;
          var priceGBP = price.value * currency.rates.GBP;
          var priceAUD = price.value * currency.rates.AUD;
          var priceJPY = price.value * currency.rates.JPY;
          var priceCAD = price.value * currency.rates.CAD;
          var priceDKK = price.value * currency.rates.DKK;
          var priceCHF = price.value * currency.rates.CHF;
          var priceSEK = price.value * currency.rates.SEK;
          var priceIDR = price.value * currency.rates.IDR;
          picked.MaxDataDiskSizeGB = picked.MaxDataDiskCount * 4 * 1024; // current max disk size is 4TB
          console.log(name+","+tier+","+cores+","+pcores+","+mem+","+region+","+price.value+","+picked.ACU+","+picked.SSD+","+picked.MaxNics+","+picked.Bandwidth+","+picked.MaxDataDiskCount+","+picked.MaxDataDiskSizeGB+","+picked.MaxDataDiskIops+","+picked.MaxDataDiskThroughputMBs+","+picked.MaxVmIops+","+picked.MaxVmThroughputMBs+","+picked.ResourceDiskSizeInMB+","+picked.TempDiskSizeInGB+","+picked.TempDiskIops+","+picked.TempDiskReadMBs+","+picked.TempDiskWriteMBs+","+picked.SAPS2T+","+picked.SAPS3T+","+picked.HANA+","+picked.Hyperthreaded+","+offer+","+vmid+","+priceUSD+","+priceEUR+","+priceGBP+","+priceAUD+","+priceJPY+","+priceCAD+","+priceDKK+","+priceCHF+","+priceSEK+","+priceIDR);
          var lookupssd = referencessd.filter(function(value){ return value.Link==filter;});
          if (Object.keys(lookupssd).length) {
            var picked = lookupssd[0];
            var ssdname = picked.Name.split("_");
            var pickedname = ssdname[1];
            var pickedoffer = "linux-"+pickedname+"-"+tier;
            var vmid = pickedoffer+"-"+region;
            console.log(pickedname+","+tier+","+cores+","+pcores+","+mem+","+region+","+price.value+","+picked.ACU+","+picked.SSD+","+picked.MaxNics+","+picked.Bandwidth+","+picked.MaxDataDiskCount+","+picked.MaxDataDiskSizeGB+","+picked.MaxDataDiskIops+","+picked.MaxDataDiskThroughputMBs+","+picked.MaxVmIops+","+picked.MaxVmThroughputMBs+","+picked.ResourceDiskSizeInMB+","+picked.TempDiskSizeInGB+","+picked.TempDiskIops+","+picked.TempDiskReadMBs+","+picked.TempDiskWriteMBs+","+picked.SAPS2T+","+picked.SAPS3T+","+picked.HANA+","+picked.Hyperthreaded+","+pickedoffer+","+vmid+","+priceUSD+","+priceEUR+","+priceGBP+","+priceAUD+","+priceJPY+","+priceGBP+","+priceAUD+","+priceJPY+","+priceCAD+","+priceDKK+","+priceCHF+","+priceSEK+","+priceIDR);
          }
        }
      }
    }
  }
}
