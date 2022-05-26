curl  -H "Content-Type: application/json" -d "{\"address\": \"0x8674AA546e121Ae2F80bd983f0F151afcba46908\"}" http://localhost:3003/api/v1/asset/import


curl  -H "Content-Type: application/json" -d '{"address": "0x27fbB1f84c3D5fbd0673aE277D8DB44d3E8409F3", "username": "as", "proxy": "0x0"}' http://localhost:3003/api/v1/account

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3003/api/v1/asset

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3003/api/v1/asset/simplenft

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3003/api/v1/assets/0xA36fBf59FD12024478A3999A1c6C2049cc8aE1d0

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3003/api/v1/assets/0xA36fBf59FD12024478A3999A1c6C2049cc8aE1d0/1


curl  -H "Content-Type: application/json" -d '{"listingTime": 2, "expirationTime": 1, "currentPrice": "1", "calldata": "0x0", "paymentToken": "0x0", "token": "2", "asset": "0xA36fBf59FD12024478A3999A1c6C2049cc8aE1d0", "maker": "0x27fbB1f84c3D5fbd0673aE277D8DB44d3E8409F3", "salt": "111" }' http://localhost:3003/api/v1/order



curl  -H "Content-Type: application/json" -d '{"address": "0x8674AA546e121Ae2F80bd983f0F151afcba46908"}' http://localhost:3003/api/v1/asset/import