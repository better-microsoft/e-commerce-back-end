curl https://api.stripe.com/v1/charges \
   -u pk_test_6stLdVdL0HAAUtX3YOUt9y4y: \
   -d amount=1000 \
   -d currency=usd \
   -d description="Curl Test bruh" \
   -d source=tok_1AeyxzDn9piYhiXzdWpDTlJ9
