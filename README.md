# CRYPTCON WEB APP
Cryptcon is a cryptocurrency Wallet, Exchange, Chat and P2P Trading platform. It supports transactions between five (5) kinds of cryptocurrencies (ETH, BTC, EOS, Ripple, Tether and XRP).
Create environment variable configuration files .env.development.local and .env.production.local, corresponding to the development environment (when running yarn start) and the production environment (when running yarn build), copy the contents of the file .env.example to these two Files

This project consist of two parts: ```frontend``` and ```backend```

## FRONTEND
The frontend was scaffolded using Create-React-App template. It is built using the following web technologies:
- React
- TailwindCSS
- SASS
- Styled components

### HOW TO START
To run the frontend part of the project, run the following command in your terminal

```
yarn frontend-start
```
For testing

```
yarn frontend-test
```

## BACKEND
The backend uses the following web technologies at its core:
- @hapi
- web3
- Morallis
- sequelize
- Ganache
- Truffle

### HOW TO START
To run the frontend part of the project, run the following command in your terminal

```
yarn backend-start
```
For testing

```
yarn backend-test
```
