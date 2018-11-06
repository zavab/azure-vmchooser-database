var reference = require('./referencedata.json');
var referencessd = require('./referencedata-ssd.json');

var pricing = {
    "payg": './apipricing-base-payg.json',
    "ri1y": './apipricing-base-1y.json',
    "ri3y": './apipricing-base-3y.json'
};

for (var pricesheet in pricing) {
    var jsonfile = require(pricing[pricesheet]);
    var offers = jsonfile.offers;
    for (var offer in offers) {
        var cores = offers[offer].cores;
        var mem = offers[offer].ram;
        var offername = offer.split("-");
        if (offername.length > 3) {
            var os = offername[0];
            var name = offername[1] + '-' + offername[2] + '-' + offername[3];
            var tier = offername[4];
        } else {
            var os = offername[0];
            var name = offername[1];
            var tier = offername[2];
        }
        if (offer.indexOf("lowpriority") > -1) {
            var filtertier = "standard";
        } else {
            var filtertier = tier;
        }
        std = "Not Found";
        ssd = "Not Found";
        var filter = filtertier + "_" + name;
        var lookup = reference.filter(function (value) { return value.Name === filter; });
        if (Object.keys(lookup).length) {
            std = "Found";
        }
        var output = referencessd.filter(function (x) { return x.Link === filter; });
        if (Object.keys(output).length) {
            ssd = "Found";
        }
        if (std === "Not Found" && ssd === "Not Found") {
            console.log(pricesheet + ','+ os + ',' + name + ',' + tier + ',' + std + ',' + ssd);
        }
    }
}