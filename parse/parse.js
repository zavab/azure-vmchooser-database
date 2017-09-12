var jsonfile = require('./apipricing.json');
var reference = require('./referencedata.json');
var referencessd = require('./referencedata-ssd.json');
var offers = jsonfile.offers

console.log("name,tier,cores,pcores,mem,region,price,ACU,SSD,MaxNics,Bandwidth,MaxDataDiskCount,MaxDataDiskSizeGB,MaxDataDiskIops,MaxDataDiskThroughputMBs,MaxVmIops,MaxVmThroughputMBs,ResourceDiskSizeInMB,TempDiskSizeInGB,TempDiskIops,TempDiskReadMBs,TempDiskWriteMBs,SAPS2T,SAPS2T,HANA,Hyperthreaded");

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
	if(picked.hasOwnProperty("BaseCpuPerformancePct")){
	  var pcores = pcores * picked.BaseCpuPerformancePct;
          // calculating the base performance for systems like the B-series
	}
	if(picked.Hyperthreaded.indexOf("Yes") > -1) {
          var pcores = pcores * 1.3 / 2;
	  // A hyperthreaded core gains 30% compared to a single threaded. So 130% performance for two vCPU's, is an equivalent of 65% of a physical core.
        }
        console.log(name+","+tier+","+cores+","+pcores+","+mem+","+region+","+price.value+","+picked.ACU+","+picked.SSD+","+picked.MaxNics+","+picked.Bandwidth+","+picked.MaxDataDiskCount+","+picked.MaxDataDiskSizeGB+","+picked.MaxDataDiskIops+","+picked.MaxDataDiskThroughputMBs+","+picked.MaxVmIops+","+picked.MaxVmThroughputMBs+","+picked.ResourceDiskSizeInMB+","+picked.TempDiskSizeInGB+","+picked.TempDiskIops+","+picked.TempDiskReadMBs+","+picked.TempDiskWriteMBs+","+picked.SAPS2T+","+picked.SAPS2T+","+picked.HANA+","+picked.Hyperthreaded);
        var lookupssd = referencessd.filter(function(value){ return value.Link==filter;});
        if (Object.keys(lookupssd).length) {
          var picked = lookupssd[0];
          var ssdname = picked.Name.split("_");
          var pickedname = ssdname[1];
          console.log(pickedname+","+tier+","+cores+","+pcores+","+mem+","+region+","+price.value+","+picked.ACU+","+picked.SSD+","+picked.MaxNics+","+picked.Bandwidth+","+picked.MaxDataDiskCount+","+picked.MaxDataDiskSizeGB+","+picked.MaxDataDiskIops+","+picked.MaxDataDiskThroughputMBs+","+picked.MaxVmIops+","+picked.MaxVmThroughputMBs+","+picked.ResourceDiskSizeInMB+","+picked.TempDiskSizeInGB+","+picked.TempDiskIops+","+picked.TempDiskReadMBs+","+picked.TempDiskWriteMBs+","+picked.SAPS2T+","+picked.SAPS2T+","+picked.HANA+","+picked.Hyperthreaded);
        }
      }
    }
  }
}
