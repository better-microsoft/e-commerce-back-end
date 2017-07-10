curl --include -X PATCH \
  http://localhost:4741/users/595fa346fd1dda6483e2632c \
  -H 'authorization: Token token=/tXWDavlv4CRJNDojAwJatOrJ5vtqHc2WbcuSV/h1H8=--wo9OFQSZ7ZNHRcdWkA+UBhj/roobBmgDtFbU8wMoTRI=' \
  -H 'content-type: application/json' \
  -d '{
      "user": {
        "cartId": "5962e36b72bd303724ada036"
      }
    }'
