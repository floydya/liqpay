

### Starting server:
```shell script
docker-compose up --build
```


### Development environment:
```shell script
npm ci
npm run start
```


### Request example:
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
