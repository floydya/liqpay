

#### Starting development server:
```shell script
docker-compose up --build
```


#### Starting local development environment:
```shell script
npm ci
npm run start
```

#### Starting production server(using deployed package):
```shell script
docker-compose -f docker-compose.production.yml up
```


#### Request example:
```json
{
    "public_key": "i00000000000",
    "private_key": "testtesttesttesttesttesttesttesttesttest",
    "method": "checkout",
    "params": {
        "action": "pay",
        "amount": "100",
        "currency": "UAH",
        "description": "test",
        "order_id": "order_id_1",
        "version": "3"
    }
}
```
Full documentation: https://www.liqpay.ua/documentation/en/api/home/