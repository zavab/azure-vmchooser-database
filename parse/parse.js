var jsonfile = require('./apipricing.json');
var reference = require('./referencedata.json');
var offers = jsonfile.offers

console.log("name,tier,cores,mem,region,price,ACU,SSD,MaxNics,Bandwidth,MaxDataDiskCount,MaxDataDiskSizeGB,MaxDataDiskIops,MaxDataDiskThroughputMBs,MaxVmIops,MaxVmThroughputMBs,ResourceDiskSizeInMB,TempDiskSizeInGB,TempDiskIops,TempDiskReadMBs,TempDiskWriteMBs,SAPS2T,SAPS2T,HANA,Hyperthreaded");

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
        console.log(name+","+tier+","+cores+","+mem+","+region+","+price.value+","+picked.ACU+","+picked.SSD+","+picked.MaxNics+","+picked.Bandwidth+","+picked.MaxDataDiskCount+","+picked.MaxDataDiskSizeGB+","+picked.MaxDataDiskIops+","+picked.MaxDataDiskThroughputMBs+","+picked.MaxVmIops+","+picked.MaxVmThroughputMBs+","+picked.ResourceDiskSizeInMB+","+picked.TempDiskSizeInGB+","+picked.TempDiskIops+","+picked.TempDiskReadMBs+","+picked.TempDiskWriteMBs+","+picked.SAPS2T+","+picked.SAPS2T+","+picked.HANA+","+picked.Hyperthreaded);
      }
    }
  }
}
