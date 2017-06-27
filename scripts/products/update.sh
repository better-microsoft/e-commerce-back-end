curl --include -X PATCH \
  http://localhost:4741/products/59529b50a182f007cc9d6001 \
  -H 'content-type: application/json' \
  -d '{
    "product": {
      "name": "test111",
      "price": 0,
      "description": "test"
    }
}'
