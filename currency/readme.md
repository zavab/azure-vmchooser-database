# Generate a new currency json?

* wget -O currency.html https://azure.microsoft.com/en-us/pricing/calculator/
* grep -E '\global.rawCurrencyData = {(.*?)\}}' currency.html | sed 's/global.rawCurrencyData = //g' | sed 's/;//g' > currency.jso
* cp currency.json ../disk/currency.json && cp currency.json ../compute/currency.json
