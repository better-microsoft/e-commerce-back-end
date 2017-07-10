curl --include -X PATCH \
  http://localhost:4741/carts-decrease/595fa3d0fd1dda6483e2632d \
  -H 'authorization: Token token=c8BR5P0o71+gqX8FkLTIpRCD9X/mZTtcopXnDbrf5TI=--9YOE07xPkSC9JAQKsHQdlOCcCRzqJhwlDgOZBPcteXY=' \
  -H 'content-type: application/json' \
  -d '{"cart": {"_id": "595fa3d0fd1dda6483e2632d"}}'
