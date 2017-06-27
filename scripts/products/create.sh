curl --include -X POST \
  http://localhost:4741/products \
  -H 'content-type: application/json' \
  -d '{
    "product": {
      "name": "test00000",
      "price": 0,
      "description": "test"
    }
}'
