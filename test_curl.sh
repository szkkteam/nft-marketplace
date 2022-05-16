curl  -H "Content-Type: application/json" -d "{\"address\": \"0xA36fBf59FD12024478A3999A1c6C2049cc8aE1d0\"}" http://localhost:3003/api/v1/asset/import


curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3003/api/v1/asset


curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3003/api/v1/assets/0xA36fBf59FD12024478A3999A1c6C2049cc8aE1d0