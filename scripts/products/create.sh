curl --include -X POST \
  https://localhost:4741/products \
  -H 'content-type: application/json' \
  -d '{
    "product": {
      "name": "Dream-Cloud",
      "price": 35,
      "description": "Vibrant Color-full Roses - Basket Included"
    }
}'
