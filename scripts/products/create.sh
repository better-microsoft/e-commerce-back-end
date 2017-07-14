curl --include -X POST \
  http://localhost:4741/products \
  -H 'content-type: application/json' \
  -d '{
    "product": {
      "name": "test10000",
      "price": 10,
      "description": "test10"
    }
}'
