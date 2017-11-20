# Generate a new pricing csv?

* wget -O apipricing.json https://azure.microsoft.com/api/v2/pricing/managed-disks/calculator/?culture=en-us&discount=ea&discount=msdn
* nodejs parse.js > newpricing.csv
* mongoimport --ssl --host myhost.documents.azure.com --port myport -u myuser -p password -d mydatabase -c mydb --type csv --file newpricing.csv --headerline --upsert
