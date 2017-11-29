#!/bin/bash
wget -O currency.html https://azure.microsoft.com/en-us/pricing/calculator/ 
result=$(grep -E '\global.rawCurrencyData = {(.*?)\}}' currency.html | sed 's/global.rawCurrencyData = //g' | sed 's/;//g' > currency.json)
echo "cp currency.json ../disk/currency.json && cp currency.json ../compute/currency.json"
