var jsonfile = require('./apipricing.json');
var vmsizes = jsonfile.sizesPayGo;
var regions = jsonfile.regions;

console.log("_id,type,slug,name");

for (var index in vmsizes) {
    var vmsize = vmsizes[index]
    console.log(vmsize.slug + ",vmsize," + vmsize.slug + "," + vmsize.displayName)

}

for (var index in regions) {
    var region = regions[index]
    console.log(region.slug + ",region," + region.slug + "," + region.displayName)

}