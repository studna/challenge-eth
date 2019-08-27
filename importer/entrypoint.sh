#!/bin/bash
for file in /data/*.csv
do
    pgfutter --ignore-errors --table token_transfers_bt csv ${file}
done