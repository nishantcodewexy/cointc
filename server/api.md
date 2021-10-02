## **Crypto P2P**

| Endpoints            | Models        | Methods                | Description             |
| -------------------- | ------------- | ---------------------- | ----------------------- |
| /users               | User, Profile | GET                    | get all users           |
| /user/{id}           | User, Profile | GET, POST, PUT, DELETE | get a single user by id |
|                      |               |                        | Delete a user           |
|                      |               |                        | Update an ad            |
|                      |               |                        |                         |
| /user                | User, Profile | POST                   | Create user             |
| /authenticate        | User, Profile | POST                   | login user/admin        |
| /ads                 | Advert        | GET                    | get all adverts         |
| /ad/{id}             | Advert        | GET, POST, DELETE      | Get an advert by id     |
|                      |               |                        | Create an ad            |
|                      |               |                        | Delete an ad            |
| /wallets             | Wallet        | GET                    |                         |
| /wallet/{id}         | Wallet        | GET                    |                         |
| /wallet/{id}/balance | Wallet        | GET                    |                         |
| /wallet/{id}/send    | Wallet        | POST                   |                         |
| /orders              | Order, Advert | GET                    |                         |
| /order/{id}          | Order, Advert | GET, POST, PUT, DELETE |                         |
|                      |               |                        |                         |
