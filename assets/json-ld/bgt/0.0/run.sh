#!/bin/sh

for file in *.graphql; do
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/ld+json" --data-binary @$file https://labs.kadaster.nl/enhancer > $file.jsonld
    jsonld format -q $file.jsonld > $file.nq
done
