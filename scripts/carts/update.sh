curl --include -X PATCH \
  http://localhost:4741/carts/5952a90d3cf4f81e2571a9e6 \
  -H 'authorization: Token token=c8BR5P0o71+gqX8FkLTIpRCD9X/mZTtcopXnDbrf5TI=--9YOE07xPkSC9JAQKsHQdlOCcCRzqJhwlDgOZBPcteXY=' \
  -H 'content-type: application/json' \
  -d '{"cart": {"owner": "595153ad6f18427ef38c416b", "product": ["5951976290fe850d650ae4c1", "5951976290fe850d650ae4c1"]}}'
