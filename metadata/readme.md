# Generate a new pricing csv?

* wget -O apipricing.json https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=en-us&discount=mosp&showSkus=true&showGuids=true
* nodejs parse.js > newpricing.csv
* mongoimport --ssl --host myhost.documents.azure.com --port myport -u myuser -p password -d mydatabase -c mydb --type csv --file newpricing.csv --headerline --upsert
