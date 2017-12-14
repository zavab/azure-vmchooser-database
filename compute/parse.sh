#!/bin/bash
wget -i apipricing.list && mv index.html apipricing-base-payg.json && mv index.html.1 apipricing-base-1y.json && mv index.html.2 apipricing-base-3y.json && nodejs parse.js > newpricing.csv
