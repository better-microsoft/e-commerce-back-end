curl --include -X PATCH \
http://localhost:4741/carts/595fa3d0fd1dda6483e2632d \
-H 'authorization: Token token=c8BR5P0o71+gqX8FkLTIpRCD9X/mZTtcopXnDbrf5TI=--9YOE07xPkSC9JAQKsHQdlOCcCRzqJhwlDgOZBPcteXY=' \
  -H 'content-type: application/json' \
  -d '{"cart": {"owner": "5962f694dcd80d5a0871e399", "product": ["5951976290fe850d650ae4c1", "5951976290fe850d650ae4c1"]}}'
