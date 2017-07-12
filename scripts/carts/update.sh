curl --include -X PATCH \
http://localhost:4741/carts/59652e7dc2f08b17acc2086d \
-H 'authorization: Token token=7hP0W6PuWuOkvaF7vfJCeJXn+LCgxCfA7HpmqxZRIt4=--qkcRMbLgP/EBs65X5hvgwvqPjvYXxTwTUmcn4OV7tEw=' \
  -H 'content-type: application/json' \
  -d '{"cart": {"owner": "59652ddec2f08b17acc2086a", "product": ["5951976290fe850d650ae4c1", "5951976290fe850d650ae4c1"]}}'
