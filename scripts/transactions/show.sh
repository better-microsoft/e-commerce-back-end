#!/bin/sh

API="http://localhost:4741"
URL_PATH="/transactions"

curl "${API}${URL_PATH}/5966b2aa2392122ff4d87a69" \
  --include \
  --request GET \
  --header "Authorization: Token token=8+O/qn2kKIU22SEj2x6yE+AfxZFIbGSnlXVx9HLBim4=--yCQRSYXDrrpAIpJNtuITk/qW30HVYUyEu7AgaGylQCo=" \

echo
#EMAIL=a PASSWORD=a
