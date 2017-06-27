curl -X POST \
  http://localhost:4741/products \
  -H 'authorization: Token token=B3vDp2Ay310wxNjPx5EMecMSFmqnUnmnD98yeaLnsjs=--FXJqlTfi/3Xoj15rjF8wZhbMTHN2tkNZaN5ej+WAG4U=' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "product": {
      "name": "test",
      "price": 0,
      "description": "test"
    }
}'
