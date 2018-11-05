var reference = require('./referencedata.json');
var referencessd = require('./referencedata-ssd.json');
var currency = require('./currency.json');
var debug = false;

var pricing = {
    "payg": './apipricing-software.json',
    "ri1y": './apipricing-software-ri1y.json',
    "ri3y": './apipricing-software-ri3y.json'
};

console.log("name,type,contract,tier,cores,pcores,mem,region,price,ACU,SSD,MaxNics,Bandwidth,MaxDataDiskCount,MaxDataDiskSizeGB,MaxDataDiskIops,MaxDataDiskThroughputMBs,MaxVmIops,MaxVmThroughputMBs,ResourceDiskSizeInMB,TempDiskSizeInGB,TempDiskIops,TempDiskReadMBs,TempDiskWriteMBs,SAPS2T,SAPS3T,SAPHANA,SAPLI,Hyperthreaded,OfferName,_id,price_USD,price_EUR,price_GBP,price_AUD,price_JPY,price_CAD,price_DKK,price_CHF,price_SEK,price_IDR,price_INR,burstable,isolated,constrained,os,infiniband,gpu");

for (var pricesheet in pricing) {
    var jsonfile = require(pricing[pricesheet]);
    var offers = jsonfile.offers;
    for (var offer in offers) {
        var skip = false;
        var skipname = "";
        // if (offer.indexOf("linux") > -1) {
        var offername = offer.split("-");
        var objectcount = offername.length;
        if (objectcount === 4) {
            // biztalk-enterprise-m128s-standard 
            var os = offername[0] + "-" + offername[1];
            var name = offername[2];
            var tier = offername[3];
        }
        if (objectcount === 5) {
            if (offername[0] === 'ubuntu') {
                // ubuntu-advantage-essential-gs5-16-standard
                var os = offername[0] + "-" + offername[1] + "-" + offername[2];
                var name = offername[3];
                var tier = offername[4];
            } else {
                // biztalk-enterprise-m128-32ms-standard
                var os = offername[0] + "-" + offername[1];
                var name = offername[2] + "-" + offername[3];
                var tier = offername[4];
            }
        }
        if (objectcount === 6) {
            if (offername[0] === 'ubuntu') {
                // ubuntu-advantage-essential-m64-32ms-standard
                var os = offername[0] + "-" + offername[1] + "-" + offername[2];
                var name = offername[3] + "-" + offername[4];;
                var tier = offername[5];
            } else {
                // biztalk-enterprise-ds14-4-v2-standard
                var os = offername[0] + "-" + offername[1];
                var name = offername[2] + "-" + offername[3] + "-" + offername[4];
                var tier = offername[5];
            }
        }
        if (debug) {
            console.log(os + "/" + name + "/" + tier);
        }
        var cores = offers[offer].cores;
        var mem = offers[offer].ram;
        if (offer.indexOf("lowpriority") > -1) {
            var filtertier = "standard";
        } else {
            var filtertier = tier;
        }
        if (offer.indexOf("promo") > -1) {
            skip = true;
            skipname = "promo";
        }
        if (os === "sql-web" || os === "sql-standard" || os === "sql-enterprise" ) {
            skip = false;
            skipname = "promo";
        } else {
            skip = true;
            skipname = os;
        }
        if (skip) {
            if (debug) {
                console.log("Skipping : " + skipname);
            }
        } else {
            for (var price in offers[offer].prices) {
                var region = price;
                var price = offers[offer].prices[price];
                var filter = filtertier + "_" + name;
                var lookup = reference.filter(function (value) { return value.Name === filter; });
                var picked = lookup[0];
                var pcores = cores;
                var vmid = offer + "-" + region + "-" + pricesheet;
                // Setup Pricing part for both non-ssd & SSD powered VMs
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
                // Checkup for non-ssd powered machines
                if (picked === undefined) {
                    if (debug) {
                        // console.log(name + "@notfound@standard@" + pricesheet);
                    }
                } else {
                    if (picked.hasOwnProperty("BaseCpuPerformancePct")) {
                        var pcores = picked.BaseCpuPerformancePct / pcores;
                        // calculating the base performance for systems like the B-series
                    }
                    if (picked.Hyperthreaded.indexOf("Yes") > -1) {
                        var pcores = pcores * 1.3 / 2;
                        // A hyperthreaded core gains 30% compared to a single threaded. So 130% performance for two vCPU's, is an equivalent of 65% of a physical core.
                    }
                    // Burstable check
                    var burstable = "No";
                    if (picked.Burstable !== undefined) {
                        var burstable = "Yes";
                    }
                    // GPU check
                    var gpu = "No";
                    if (picked.GPU !== undefined) {
                        gpu = picked.GPU;
                    }
                    // Infiniband check
                    var infiniband = "No";
                    if (picked.Infiniband !== undefined) {
                        infiniband = picked.Infiniband;
                    }
                    // Isolated check
                    var isolated = "No";
                    if (picked.Isolated !== undefined) {
                        var isolated = "Yes";
                    }
                    // Constrained check
                    var constrained = "No";
                    if (picked.Constrained !== undefined) {
                        var constrained = "Yes";
                    }
                    // SAP HANA check
                    var SAPHANA = "No";
                    if (picked.HANA !== undefined) {
                        SAPHANA = picked.HANA;
                    }
                    // SAP SAPS2T check
                    var SAPS2T = "-1";
                    if (picked.SAPS2T !== undefined) {
                        SAPS2T = picked.SAPS2T;
                    }
                    // SAP SAPS3T check
                    var SAPS3T = "-1";
                    if (picked.SAPS3T !== undefined) {
                        SAPS3T = picked.SAPS3T;
                    }
                    // SAP LI check
                    var SAPLI = "No";
                    if (picked.LargeInstance !== undefined) {
                        SAPLI = picked.LargeInstance;
                    }
                    // Calc max disk size for VM
                    picked.MaxDataDiskSizeGB = picked.MaxDataDiskCount * 4 * 1024; // current max disk size is 4TB
                    // Print output

                    if (debug === false) {
                        console.log(
                            name +
                            ",vm," +
                            pricesheet + "," +
                            tier + "," +
                            cores + "," +
                            pcores + "," +
                            mem + "," +
                            region + "," +
                            price.value + "," +
                            picked.ACU + "," +
                            picked.SSD + "," +
                            picked.MaxNics + "," +
                            picked.Bandwidth + "," +
                            picked.MaxDataDiskCount + "," +
                            picked.MaxDataDiskSizeGB + "," +
                            picked.MaxDataDiskIops + "," +
                            picked.MaxDataDiskThroughputMBs + "," +
                            picked.MaxVmIops + "," +
                            picked.MaxVmThroughputMBs + "," +
                            picked.ResourceDiskSizeInMB + "," +
                            picked.TempDiskSizeInGB + "," +
                            picked.TempDiskIops + "," +
                            picked.TempDiskReadMBs + "," +
                            picked.TempDiskWriteMBs + "," +
                            SAPS2T + "," +
                            SAPS3T + "," +
                            SAPHANA + "," +
                            SAPLI + "," +
                            picked.Hyperthreaded + "," +
                            offer + "," +
                            vmid + "," +
                            priceUSD + "," +
                            priceEUR + "," +
                            priceGBP + "," +
                            priceAUD + "," +
                            priceJPY + "," +
                            priceCAD + "," +
                            priceDKK + "," +
                            priceCHF + "," +
                            priceSEK + "," +
                            priceIDR + "," +
                            priceINR + "," +
                            burstable + "," +
                            isolated + "," +
                            constrained + "," +
                            os + "," +
                            infiniband + "," +
                            gpu);
                    } else {
                        // console.log(name + "@found@standard@" + pricesheet);
                    }
                } 
                // Checkup for SSD Powered (or other variants, like Isolated) Machines that leverage the same pricing SKU
                var output = referencessd.filter(function (x) { return x.Link === filter; });
                if (Object.keys(output).length) {
                    for (var variant in output) {
                        var picked = output[variant];
                        var ssdname = picked.Name.split("_");
                        var pickedname = ssdname[1];
                        var pickedoffer = os + "-" + pickedname + "-" + tier;
                        var vmid = pickedoffer + "-" + region + "-" + pricesheet;
                        if (picked.hasOwnProperty("BaseCpuPerformancePct")) {
                            var pcores = picked.BaseCpuPerformancePct / pcores;
                            // calculating the base performance for systems like the B-series
                        }
                        if (picked.Hyperthreaded.indexOf("Yes") > -1) {
                            var pcores = pcores * 1.3 / 2;
                            // A hyperthreaded core gains 30% compared to a single threaded. So 130% performance for two vCPU's, is an equivalent of 65% of a physical core.
                        }
                        // Burstable check
                        var burstable = "No";
                        if (picked.Burstable !== undefined) {
                            var burstable = "Yes";
                        }
                        // GPU check
                        var gpu = "No";
                        if (picked.GPU !== undefined) {
                            gpu = picked.GPU;
                        }
                        // Infiniband check
                        var infiniband = "No";
                        if (picked.Infiniband !== undefined) {
                            infiniband = picked.Infiniband;
                        }
                        // Isolated check
                        var isolated = "No";
                        if (picked.Isolated !== undefined) {
                            var isolated = "Yes";
                        }
                        // Constrained check
                        var constrained = "No";
                        if (picked.Constrained !== undefined) {
                            var constrained = "Yes";
                        }
                        // SAP HANA check
                        var SAPHANA = "No";
                        if (picked.HANA !== undefined) {
                            SAPHANA = picked.HANA;
                        }
                        // SAP SAPS2T check
                        var SAPS2T = "-1";
                        if (picked.SAPS2T !== undefined) {
                            SAPS2T = picked.SAPS2T;
                        }
                        // SAP SAPS3T check
                        var SAPS3T = "-1";
                        if (picked.SAPS3T !== undefined) {
                            SAPS3T = picked.SAPS3T;
                        }
                        // SAP LI check
                        var SAPLI = "No";
                        if (picked.LargeInstance !== undefined) {
                            SAPLI = picked.LargeInstance;
                        }
                        // Calc max disk size for VM
                        picked.MaxDataDiskSizeGB = picked.MaxDataDiskCount * 4 * 1024; // current max disk size is 4TB
                        // Print output
                        if (debug === false) {
                            console.log(
                                pickedname +
                                ",vm," +
                                pricesheet + "," +
                                tier + "," +
                                cores + "," +
                                pcores + "," +
                                mem + "," +
                                region + "," +
                                price.value + "," +
                                picked.ACU + "," +
                                picked.SSD + "," +
                                picked.MaxNics + "," +
                                picked.Bandwidth + "," +
                                picked.MaxDataDiskCount + "," +
                                picked.MaxDataDiskSizeGB + "," +
                                picked.MaxDataDiskIops + "," +
                                picked.MaxDataDiskThroughputMBs + "," +
                                picked.MaxVmIops + "," +
                                picked.MaxVmThroughputMBs + "," +
                                picked.ResourceDiskSizeInMB + "," +
                                picked.TempDiskSizeInGB + "," +
                                picked.TempDiskIops + "," +
                                picked.TempDiskReadMBs + "," +
                                picked.TempDiskWriteMBs + "," +
                                SAPS2T + "," +
                                SAPS3T + "," +
                                SAPHANA + "," +
                                SAPLI + "," +
                                picked.Hyperthreaded + "," +
                                pickedoffer + "," +
                                vmid + "," +
                                priceUSD + "," +
                                priceEUR + "," +
                                priceGBP + "," +
                                priceAUD + "," +
                                priceJPY + "," +
                                priceCAD + "," +
                                priceDKK + "," +
                                priceCHF + "," +
                                priceSEK + "," +
                                priceIDR + "," +
                                priceINR + "," +
                                burstable + "," +
                                isolated + "," +
                                constrained + "," +
                                os + "," +
                                infiniband + "," +
                                gpu);
                        } else {
                            // console.log(name + "@found@premium@" + pricesheet);
                        }
                    }
                } else {
                    if (debug) {
                        // console.log(name + "@notfound@premium@" + pricesheet);
                    }
                }
            }
        }
    }
    // }
}