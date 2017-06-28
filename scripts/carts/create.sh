curl --include -X POST \
  http://localhost:4741/carts \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{"cart": {"owner": "595153ad6f18427ef38c416b", "product": ["5952b57ea52d092b8d34c6b0", "5952b57ea52d092b8d34c6b0"]}}'
