#!/bin/bash

API="http://localhost:4741"
URL_PATH="/transactions"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=8+O/qn2kKIU22SEj2x6yE+AfxZFIbGSnlXVx9HLBim4=--yCQRSYXDrrpAIpJNtuITk/qW30HVYUyEu7AgaGylQCo=" \
  --data '{
    "transaction": {
      "product": ["test", "test again"],
      "stripe": ["token test"],
      "owner": "59514c37a1294279f80febeb"
    }
  }'

echo
#EMAIL=a PASSWORD=a
