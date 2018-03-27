#!/bin/bash
nodejs node_modules/csvtojson/bin/csvtojson newpricing.csv > newpricing.json

echo 'var ROW_DATA = ' > data.js
cat newpricing.json >> data.js
echo ';' >> data.js
echo 'function createRowData() { return ROW_DATA; }' >> data.js
