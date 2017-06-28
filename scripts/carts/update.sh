curl --include -X PATCH \
  http://localhost:4741/carts/5952a90d3cf4f81e2571a9e6 \
  -H 'authorization: Token token=B3vDp2Ay310wxNjPx5EMecMSFmqnUnmnD98yeaLnsjs=--FXJqlTfi/3Xoj15rjF8wZhbMTHN2tkNZaN5ej+WAG4U=' \
  -H 'content-type: application/json' \
  -d '{"cart": {"owner": "595153ad6f18427ef38c416b", "product": ["5951976290fe850d650ae4c1", "5951976290fe850d650ae4c1"]}}'
