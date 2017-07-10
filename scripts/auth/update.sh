curl --include -X PATCH \
  http://localhost:4741/users/5962f694dcd80d5a0871e399 \
  -H 'authorization: Token token=2qD/pw0rqWPSAuR9Z1tsrCs4gHJljdrykpnTQLJmoVk=--9N1beh1KJSKLJ2Am9xpW9gZVMaEmaC1WfsZ1lMO8ThE=' \
  -H 'content-type: application/json' \
  -d '{
      "user": {
        "cartId": "5962f6c7dcd80d5a0871e39a"
      }
    }'
