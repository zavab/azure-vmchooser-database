* Generate a new pricing csv?

wget -O apipricing.json https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=nl-nl&discount=mosp
nodejs parse.js > newpricing.csv 