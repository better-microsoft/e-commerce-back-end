curl --include -X PATCH \
  http://localhost:4741/users/59652ddec2f08b17acc2086a \
  -H 'authorization: Token token=7hP0W6PuWuOkvaF7vfJCeJXn+LCgxCfA7HpmqxZRIt4=--qkcRMbLgP/EBs65X5hvgwvqPjvYXxTwTUmcn4OV7tEw=' \
  -H 'content-type: application/json' \
  -d '{
      "user": {
        "cartId": "59652e7dc2f08b17acc2086d"
      }
    }'
